import { getPayloadClient } from '@/lib/payload'
import { Project, Media } from '@/payload-types'
import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Projects',
}

export default async function ProjectsPage() {
  const payload = await getPayloadClient()

  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 2,
    sort: '-createdAt',
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
      <p className="text-gray-500 mb-12">Explore our ongoing and completed research projects.</p>
      <ProjectsClient projects={projects as Project[]} />
    </div>
  )
}
