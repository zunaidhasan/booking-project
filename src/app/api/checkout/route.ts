import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("CRITICAL: STRIPE_SECRET_KEY is missing from environment variables.");
  }
  try {
    const { serviceId } = await req.json();

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: service.name,
              description: service.description,
              images: [service.image],
            },
            unit_amount: Math.round(service.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
      metadata: {
        serviceId: service.id,
      },
    });

    // CRITICAL: Create a pending booking record to ensure visibility in Admin Dashboard even if webhook is delayed.
    try {
      await prisma.booking.create({
        data: {
          customerEmail: "pending_completion@placeholder.com", // Will be updated by webhook
          serviceId: service.id,
          status: "pending",
          paymentStatus: "unpaid",
          stripeSessionId: session.id,
          totalPrice: service.price,
        },
      });
      console.log(`[Checkout] Pending booking created for session: ${session.id}`);
    } catch (dbError) {
      console.error("[Checkout] Failed to create pending booking record:", dbError);
      // We don't block the user from paying if the initial record creation fails, 
      // as the webhook will still try to create it.
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
