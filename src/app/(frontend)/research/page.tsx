import { getPayloadClient } from '@/lib/payload'
import { ResearchArea, Publication, Media } from '@/payload-types'
import Image from 'next/image'
import ResearchClient from './ResearchClient'

export const metadata = {
  title: 'Research',
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ResearchPage() {
  const payload = await getPayloadClient()

  const { docs: areas } = await payload.find({
    collection: 'research-areas',
    sort: 'order',
    depth: 1,
  })

  const { docs: publications } = await payload.find({
    collection: 'publications',
    sort: '-year',
    depth: 1,
    limit: 100,
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Research Areas */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Research</h1>
        <p className="text-gray-500 mb-12">
          Our lab works across several interconnected research areas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => {
            const icon = area.icon as any
            return (
              <div
                key={area.id}
                className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-12 h-12 relative">
                  {icon?.imagekit.url ? (
                    <Image
                      src={icon.imagekit.url}
                      alt={icon.alt || area.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                      🔭
                    </div>
                  )}
                </div>

                {/* Name + Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{area.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{area.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Publications</h2>
        <p className="text-gray-500 mb-10">
          Peer-reviewed papers, conference proceedings, and more.
        </p>
        <ResearchClient
          publications={publications as Publication[]}
          areas={areas as ResearchArea[]}
        />
      </section>
    </div>
  )
}
