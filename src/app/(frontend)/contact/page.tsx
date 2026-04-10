import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ContactPage() {
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const { contact, socialLinks } = settings

  const socials = [
    { key: 'linkedin', label: 'LinkedIn', href: socialLinks?.linkedin },
    { key: 'twitter', label: 'Twitter / X', href: socialLinks?.twitter },
    { key: 'github', label: 'GitHub', href: socialLinks?.github },
    { key: 'researchGate', label: 'ResearchGate', href: socialLinks?.researchGate },
  ].filter((s) => s.href)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-500 mb-16">
        Have a question or want to collaborate? Reach out to us.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-10">
          {/* Address */}
          {contact?.address && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Address</h2>
              <address className="not-italic text-gray-600 leading-relaxed text-sm">
                {contact.address.building && <p>{contact.address.building}</p>}
                {contact.address.room && <p>Room {contact.address.room}</p>}
                {contact.address.college && <p>{contact.address.college}</p>}
                {(contact.address.city || contact.address.state) && (
                  <p>
                    {[contact.address.city, contact.address.state].filter(Boolean).join(', ')}
                    {contact.address.pin && ` — ${contact.address.pin}`}
                  </p>
                )}
              </address>
            </div>
          )}

          {/* Email & Phone */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Direct Contact</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {contact?.email && (
                <Link
                  href={`mailto:${contact.email}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  ✉️ {contact.email}
                </Link>
              )}
              {contact?.phone && (
                <Link
                  href={`tel:${contact.phone}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  📞 {contact.phone}
                </Link>
              )}
            </div>
          </div>

          {/* Social Links */}
          {socials.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Follow Us</h2>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.key}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 border border-gray-200 rounded-full text-gray-600 hover:border-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          {contact?.mapEmbedUrl && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Location</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-64">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
