'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  success: boolean
  errors?: Record<string, string>
  message?: string
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  const result = schema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      errors: {
        error: JSON.stringify(result.error),
      },
    }
  }

  const labEmail = process.env.LAB_EMAIL
  if (!labEmail) {
    return { success: false, message: 'Lab email not configured.' }
  }

  // Using Nodemailer — install it below
  const nodemailer = await import('nodemailer')

  const transporter = nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"${result.data.name}" <${process.env.SMTP_USER}>`,
      to: labEmail,
      replyTo: result.data.email,
      subject: `[ISD Lab Contact] ${result.data.subject}`,
      text: `Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`,
      html: `
        <p><strong>Name:</strong> ${result.data.name}</p>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Subject:</strong> ${result.data.subject}</p>
        <hr />
        <p>${result.data.message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return { success: true, message: 'Message sent successfully!' }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, message: 'Failed to send message. Please try again.' }
  }
}
