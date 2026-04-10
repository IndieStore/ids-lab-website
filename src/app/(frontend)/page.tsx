import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'
import RichTextRenderer from '@/components/RichTextRenderer'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: settings.labName,
    description: settings.tagline,
  }
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const bannerImage = settings.bannerImage as Media | null

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-[90vh] flex items-center justify-center text-white">
        {/* Background */}
        {bannerImage?.url ? (
          <Image
            src={bannerImage.url}
            alt={bannerImage.alt || 'Banner'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-gray-700" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            {settings.labName}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-200">{settings.tagline}</p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">About the Lab</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          {settings.about?.content && <RichTextRenderer content={settings.about.content} />}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Explore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Projects', href: '/projects', emoji: '🔬' },
              { label: 'Research', href: '/research', emoji: '📄' },
              { label: 'People', href: '/people', emoji: '👥' },
              { label: 'Contact Us', href: '/contact', emoji: '✉️' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-semibold text-gray-800">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
