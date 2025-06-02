"use server"

import { z } from "zod"
import { safeSupabaseInsert } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Check for honeypot field
    if (formData.get("honeypot")) {
      // This is likely a bot submission
      return {
        success: true, // Pretend it worked to not alert the bot
        message: "Thank you for your message. I'll get back to you soon!",
      }
    }

    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate form data
    const validatedData = contactSchema.parse(data)

    // Store submission data in Supabase
    const submissionData = {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    }

    // Try to store in Supabase, but continue even if it fails
    const dbResult = await safeSupabaseInsert("contact_submissions", submissionData)

    if (!dbResult.success) {
      console.log("Failed to store contact submission in database, continuing with email...")
    }

    // Send email notification using Resend
    const emailResult = await sendEmail({
      to: process.env.EMAIL_FROM!,
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; border-left: 4px solid #ccc; margin: 10px 0;">
          ${validatedData.message.replace(/\n/g, "<br>")}
        </div>
        <p style="color: #666; margin-top: 20px;">This message was sent from your portfolio contact form.</p>
      `,
    })

    if (!emailResult.success) {
      console.error("Failed to send email notification:", emailResult.error)
      return {
        success: false,
        message: "There was an error sending your message. Please try again or contact me directly via email.",
      }
    }

    // Return success response
    return {
      success: true,
      message: "Thank you for your message. I'll get back to you soon!",
    }
  } catch (error) {
    console.error("Contact form error:", error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return {
        success: false,
        message: firstError.message || "Please check your form inputs",
      }
    }

    // Handle other errors
    return {
      success: false,
      message: "There was an error sending your message. Please try again.",
    }
  }
}
