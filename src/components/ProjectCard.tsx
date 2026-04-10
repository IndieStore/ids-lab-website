import Link from 'next/link'
import Image from 'next/image'
import { Project, Media } from '@/payload-types'

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const thumbnail = project.thumbnail as Media | null

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100">
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
            🔬
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Status badge */}
        <span
          className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${
            project.status === 'ongoing'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{project.title}</h3>

        {/* Short description */}
        <p className="text-sm text-gray-500 line-clamp-3 flex-1">{project.shortDescription}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t.id}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}

        {/* View Details */}
        <Link
          href={`/projects/${project.slug}`}
          className="mt-2 text-sm font-semibold text-gray-900 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
