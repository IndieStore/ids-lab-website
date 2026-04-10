'use client'

import { useState } from 'react'
import { Project } from '@/payload-types'
import ProjectCard from '@/components/ProjectCard'

type Props = {
  projects: Project[]
}

export default function ProjectsClient({ projects }: Props) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all')
  const [tagFilter, setTagFilter] = useState<string>('all')

  // Collect all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags?.map((t) => t.tag) ?? [])),
  ).filter(Boolean) as string[]

  const filtered = projects.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    const matchesTag = tagFilter === 'all' || p.tags?.some((t) => t.tag === tagFilter)
    return matchesStatus && matchesTag
  })

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {/* Status filter */}
        <div className="flex gap-2">
          {(['all', 'ongoing', 'completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors capitalize ${
                statusFilter === s
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
              }`}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>

        {/* Divider */}
        {allTags.length > 0 && <span className="text-gray-300 hidden md:block">|</span>}

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTagFilter('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                tagFilter === 'all'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  tagFilter === tag
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-6">
        Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No projects match the selected filters.
        </div>
      )}
    </>
  )
}
