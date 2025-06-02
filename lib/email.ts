import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You can customize this after verifying your domain in Resend
      to: [to],
      subject: subject,
      html: html,
    })

    if (error) {
      console.error("Resend API error:", error)
      return { success: false, error }
    }

    console.log("Email sent with Resend:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending email with Resend:", error)
    return { success: false, error }
  }
}
