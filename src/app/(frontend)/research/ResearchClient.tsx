'use client'

import { useState } from 'react'
import { Publication, ResearchArea } from '@/payload-types'
import Link from 'next/link'

type Props = {
  publications: Publication[]
  areas: ResearchArea[]
}

export default function ResearchClient({ publications, areas }: Props) {
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [areaFilter, setAreaFilter] = useState<string>('all')

  // Collect unique years
  const allYears = Array.from(new Set(publications.map((p) => String(p.year)))).sort(
    (a, b) => Number(b) - Number(a),
  )

  const filtered = publications.filter((p) => {
    const matchesYear = yearFilter === 'all' || String(p.year) === yearFilter
    const matchesArea =
      areaFilter === 'all' ||
      (p.researchAreas as ResearchArea[] | null)?.some((a) => String(a.id) === areaFilter)
    return matchesYear && matchesArea
  })

  // Group filtered publications by year
  const grouped = filtered.reduce<Record<string, Publication[]>>((acc, pub) => {
    const y = String(pub.year)
    if (!acc[y]) acc[y] = []
    acc[y].push(pub)
    return acc
  }, {})

  const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  const typeBadgeColor: Record<string, string> = {
    journal: 'bg-blue-50 text-blue-700',
    conference: 'bg-purple-50 text-purple-700',
    workshop: 'bg-yellow-50 text-yellow-700',
    'book-chapter': 'bg-green-50 text-green-700',
    preprint: 'bg-gray-100 text-gray-600',
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {/* Year filter */}
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="text-sm px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:border-gray-500"
        >
          <option value="all">All Years</option>
          {allYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Area filter */}
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
          className="text-sm px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:border-gray-500"
        >
          <option value="all">All Research Areas</option>
          {areas.map((a) => (
            <option key={a.id} value={String(a.id)}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-8">
        Showing {filtered.length} publication{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Publications grouped by year */}
      {sortedYears.length > 0 ? (
        <div className="flex flex-col gap-12">
          {sortedYears.map((year) => (
            <div key={year}>
              {/* Year heading */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {year}
              </h3>

              <div className="flex flex-col gap-4">
                {grouped[year].map((pub) => {
                  const paperUrl = pub.doi ? `https://doi.org/${pub.doi}` : (pub.paperLink ?? null)

                  return (
                    <div
                      key={pub.id}
                      className="flex flex-col gap-2 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        {/* Title */}
                        <h4 className="text-base font-semibold text-gray-900 flex-1">
                          {pub.title}
                        </h4>
                        {/* Type badge */}
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap ${
                            typeBadgeColor[pub.type] ?? 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {pub.type}
                        </span>
                      </div>

                      {/* Authors */}
                      <p className="text-sm text-gray-500">{pub.authors}</p>

                      {/* Venue */}
                      <p className="text-sm text-gray-400 italic">{pub.venueName}</p>

                      {/* Abstract */}
                      {pub.abstract && (
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{pub.abstract}</p>
                      )}

                      {/* Links */}
                      <div className="flex gap-4 mt-1">
                        {paperUrl && (
                          <Link
                            href={paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            View Paper →
                          </Link>
                        )}
                        {pub.pdfUpload && (
                          <Link
                            href={(pub.pdfUpload as any).url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-600 hover:underline"
                          >
                            PDF ↓
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No publications match the selected filters.
        </div>
      )}
    </>
  )
}
