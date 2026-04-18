import { getPayloadClient } from '@/lib/payload'
import { NewsAndEvent } from '@/payload-types'
import NewsAndEventsClient from './NewsAndEventsClient'

export const metadata = {
  title: 'News & Events',
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function NewsAndEventsPage() {
  const payload = await getPayloadClient()
  const { docs: items } = await payload.find({
    collection: 'news-and-events',
    depth: 2,
    sort: '-createdAt',
    limit: 20,
  })

  // Format dates on the server
  const formattedItems = (items as NewsAndEvent[]).map((item) => ({
    ...item,
    createdAtFormatted: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '',
    dateFormatted: item.date
      ? new Date(item.date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '',
  }))

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Events</h1>
      <p className="text-gray-500 mb-12">Latest news and upcoming events from our group.</p>
      <NewsAndEventsClient items={formattedItems} />
    </div>
  )
}
