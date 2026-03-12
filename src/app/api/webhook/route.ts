import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendBookingEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const serviceId = session.metadata?.serviceId;
    const customerEmail = session.customer_details?.email;

    console.log(`[Webhook] Processing checkout.session.completed for session: ${session.id}`);
    console.log(`[Webhook] Metadata Service ID: ${serviceId}`);
    console.log(`[Webhook] Customer Email: ${customerEmail}`);

    if (serviceId && customerEmail) {
      try {
        // Attempt to find an existing pending booking created during checkout
        const existingBooking = await prisma.booking.findFirst({
          where: { stripeSessionId: session.id }
        });

        if (existingBooking) {
          console.log(`[Webhook] Updating existing booking ID: ${existingBooking.id}`);
          await prisma.booking.update({
            where: { id: existingBooking.id },
            data: {
              customerEmail,
              status: "completed",
              paymentStatus: "paid",
            },
          });
        } else {
          console.log(`[Webhook] No existing booking found for session ${session.id}. Creating new record.`);
          const service = await prisma.service.findUnique({
            where: { id: serviceId },
          });

          if (service) {
            await prisma.booking.create({
              data: {
                customerEmail,
                serviceId,
                status: "completed",
                paymentStatus: "paid",
                stripeSessionId: session.id,
                totalPrice: service.price,
              },
            });
          } else {
            console.error(`[Webhook] CRITICAL: Service ${serviceId} not found in database.`);
          }
        }

        console.log(`[Webhook] Booking successfully persisted for email: ${customerEmail}`);
        
        // Send confirmation email
        try {
          await sendBookingEmail(customerEmail);
          console.log(`[Webhook] Confirmation email sent to: ${customerEmail}`);
        } catch (emailError) {
          console.error(`[Webhook] Failed to send email:`, emailError);
        }
      } catch (dbError) {
        console.error(`[Webhook] Database error during booking persistence:`, dbError);
      }
    } else {
      console.warn(`[Webhook] Missing serviceId (${serviceId}) or customerEmail (${customerEmail})`);
    }
  }

  return new NextResponse(null, { status: 200 });
}
