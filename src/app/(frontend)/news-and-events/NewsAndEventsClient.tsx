'use client'

import Image from 'next/image'
import { NewsAndEvent, Media } from '@/payload-types'
import RichTextRenderer from '@/components/RichTextRenderer'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type Props = {
  items: (import('@/payload-types').NewsAndEvent & {
    createdAtFormatted?: string
    dateFormatted?: string
  })[]
}

export default function NewsAndEventsClient({ items }: Props) {
  const news = items.filter((item) => item.type === 'news')

  const events = items.filter((item) => item.type === 'event')

  // Gather all event images into a flat array
  const allEventImages: { url: string; alt: string }[] = []
  events.forEach((event) => {
    event.images?.forEach((img, idx) => {
      let url = ''
      let alt = event.eventName || 'Event image'
      if (typeof img.image === 'object' && img.image !== null) {
        url = (img.image as Media)?.imagekit?.url || (img.image as Media)?.url || ''
        if ((img.image as Media)?.alt) alt = (img.image as Media).alt
      }
      if (url) allEventImages.push({ url, alt })
    })
  })

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <ul className="space-y-4">
          {news.map((n) => (
            <li key={n.id} className="bg-white rounded shadow p-4">
              <h3 className="font-bold text-lg mb-1">{n.eventName}</h3>
              <div className="prose mb-2">
                <RichTextRenderer content={n.description} />
              </div>
              <span className="text-xs text-gray-500">{n.createdAtFormatted}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        {allEventImages.length > 0 ? (
          <div className="w-full mb-6">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={5000}
              className="rounded-lg overflow-hidden"
            >
              {allEventImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-64">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="text-gray-500 mb-6">No event images found.</div>
        )}
        <ul className="space-y-4">
          {events.map((e) => (
            <li key={e.id} className="bg-white rounded shadow p-4">
              <h3 className="font-bold text-lg mb-1">{e.eventName}</h3>
              <div className="prose mb-2">
                <RichTextRenderer content={e.description} />
              </div>
              {e.dateFormatted && <span className="text-xs text-gray-500">{e.dateFormatted}</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
