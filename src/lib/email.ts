import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "BookingPro <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Confirmation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">Booking Confirmation</h2>
          <p>Your booking was successful.</p>
          <p>Thank you for your payment.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 14px;">© 2026 BookingPro</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email sending failed:", err);
    return { success: false, error: err };
  }
}
