import { getPayloadClient } from '@/lib/payload'
import { Person } from '@/payload-types'
import PersonCard from '@/components/PersonCard'

export const metadata = {
  title: 'People',
}

const ROLE_ORDER = ['pi', 'phd', 'jrf', 'intern'] as const
const ROLE_LABELS: Record<string, string> = {
  pi: 'PI / Lab Director',
  phd: 'PhD Students',
  jrf: 'Junior Research Fellows',
  intern: 'Interns',
}

export default async function PeoplePage() {
  const payload = await getPayloadClient()

  const { docs: people } = await payload.find({
    collection: 'people',
    depth: 1,
    sort: 'order',
    limit: 100,
  })

  // Group by role
  const grouped = ROLE_ORDER.reduce<Record<string, Person[]>>(
    (acc, role) => {
      acc[role] = people.filter((p) => p.role === role) as Person[]
      return acc
    },
    {} as Record<string, Person[]>,
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">People</h1>
      <p className="text-gray-500 mb-16">Meet the researchers and students behind our work.</p>

      {ROLE_ORDER.map((role) => {
        const members = grouped[role]
        if (!members || members.length === 0) return null

        return (
          <section key={role} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-2 border-b border-gray-200">
              {ROLE_LABELS[role]}
            </h2>

            {role === 'pi' ? (
              // PI — featured full-width card
              <div className="flex flex-col gap-6">
                {members.map((person) => (
                  <PersonCard key={person.id} person={person} featured />
                ))}
              </div>
            ) : (
              // Others — 3-column grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
