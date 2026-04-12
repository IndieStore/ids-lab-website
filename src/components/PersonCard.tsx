import Image from 'next/image'
import Link from 'next/link'
import { Person, Media } from '@/payload-types'

type Props = {
  person: Person
  featured?: boolean
}

const ROLE_LABELS: Record<string, string> = {
  pi: 'PI / Lab Director',
  phd: 'PhD Student',
  jrf: 'Junior Research Fellow',
  intern: 'Intern',
}

const ROLE_COLORS: Record<string, string> = {
  pi: 'bg-yellow-50 text-yellow-700',
  phd: 'bg-blue-50 text-blue-700',
  jrf: 'bg-purple-50 text-purple-700',
  intern: 'bg-green-50 text-green-700',
}

export default function PersonCard({ person, featured = false }: Props) {
  const photo = person.photo as any
  const cv = person.links?.cv as Media | null

  if (featured) {
    return (
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Photo */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-100 shrink-0 mx-auto md:mx-0">
          {photo?.imagekit.url ? (
            <Image
              src={photo.imagekit.url}
              alt={photo.alt || person.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl text-gray-300">
              👤
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{person.name}</h3>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_COLORS[person.role]}`}
            >
              {ROLE_LABELS[person.role]}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{person.bio}</p>

          {/* Research interests */}
          {person.researchInterests && person.researchInterests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {person.researchInterests.map((r) => (
                <span
                  key={r.id}
                  className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {r.tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-1">
            <Link
              href={`mailto:${person.email}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ✉️ {person.email}
            </Link>
            {person.links?.linkedin && (
              <Link
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                LinkedIn
              </Link>
            )}
            {person.links?.googleScholar && (
              <Link
                href={person.links.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Google Scholar
              </Link>
            )}
            {person.links?.researchGate && (
              <Link
                href={person.links.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ResearchGate
              </Link>
            )}
            {cv?.url && (
              <Link
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                CV / Resume ↓
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Regular card
  return (
    <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto">
        {photo?.imagekit.url ? (
          <Image
            src={photo.imagekit.url}
            alt={photo.alt || person.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300">
            👤
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center gap-2">
        <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_COLORS[person.role]}`}
        >
          {ROLE_LABELS[person.role]}
        </span>
        <p className="text-sm text-gray-500 line-clamp-4 mt-1">{person.bio}</p>
      </div>

      {/* Research interests */}
      {person.researchInterests && person.researchInterests.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {person.researchInterests.slice(0, 3).map((r) => (
            <span key={r.id} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {r.tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-3 mt-auto pt-2 border-t border-gray-100">
        <Link
          href={`mailto:${person.email}`}
          className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          ✉️ Email
        </Link>
        {person.links?.linkedin && (
          <Link
            href={person.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            LinkedIn
          </Link>
        )}
        {person.links?.googleScholar && (
          <Link
            href={person.links.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            Scholar
          </Link>
        )}
        {person.links?.researchGate && (
          <Link
            href={person.links.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            ResearchGate
          </Link>
        )}
        {cv?.url && (
          <Link
            href={cv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            CV ↓
          </Link>
        )}
      </div>
    </div>
  )
}
