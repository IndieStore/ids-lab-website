'use client'

import { useActionState } from 'react'
import { submitContactForm, ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { success: false }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center">
        <p className="text-lg font-semibold">✅ Message sent!</p>
        <p className="text-sm mt-1">We'll get back to you at your provided email address.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Global error */}
      {state.message && !state.success && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
        />
        {state.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
        />
        {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email}</p>}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this regarding?"
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
        />
        {state.errors?.subject && <p className="text-xs text-red-500">{state.errors.subject}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Write your message here..."
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors resize-none"
        />
        {state.errors?.message && <p className="text-xs text-red-500">{state.errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
