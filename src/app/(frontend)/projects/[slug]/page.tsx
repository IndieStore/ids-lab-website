import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Project, Media, Person } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import RichTextRenderer from '@/components/RichTextRenderer'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const project = docs[0] as Project | undefined
  if (!project) notFound()

  const thumbnail = project.thumbnail as Media | null
  const team = project.teamMembers as Person[] | null

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="text-sm text-gray-500 hover:text-gray-800 mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            project.status === 'ongoing'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </span>
        {project.fundingAgency && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            Funded by {project.fundingAgency}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h1>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((t) => (
            <span key={t.id} className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
              {t.tag}
            </span>
          ))}
        </div>
      )}

      {/* Thumbnail */}
      {thumbnail?.url && (
        <div className="relative w-full h-72 rounded-xl overflow-hidden mb-10 bg-gray-100">
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Full Description */}
      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <RichTextRenderer content={project.fullDescription} />
      </div>

      {/* Timeline */}
      {project.timeline?.startDate && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Timeline</h2>
          <p className="text-gray-600">
            {new Date(project.timeline.startDate).toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric',
            })}
            {project.timeline.endDate && (
              <>
                {' '}
                —{' '}
                {new Date(project.timeline.endDate).toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </>
            )}
          </p>
        </div>
      )}

      {/* Team */}
      {team && team.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Team</h2>
          <div className="flex flex-wrap gap-3">
            {team.map((member) => (
              <Link
                key={member.id}
                href="/people"
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors"
              >
                {member.name}
                <span className="text-xs text-gray-400 capitalize">{member.role}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Linked Publications */}
      {project.linkedPublications && project.linkedPublications.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Linked Publications</h2>
          <div className="flex flex-col gap-3">
            {(project.linkedPublications as any[]).map((pub) => (
              <div key={pub.id} className="p-4 border border-gray-200 rounded-lg text-sm">
                <p className="font-semibold text-gray-800">{pub.title}</p>
                <p className="text-gray-500 mt-1">
                  {pub.authors} · {pub.year} · {pub.venueName}
                </p>
                {(pub.doi || pub.paperLink) && (
                  <Link
                    href={pub.doi ? `https://doi.org/${pub.doi}` : pub.paperLink}
                    target="_blank"
                    className="text-blue-600 hover:underline mt-1 inline-block"
                  >
                    View Paper →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
