import Link from 'next/link'

type Props = {
  labName: string
}

export default function Navbar({ labName }: Props) {
  const links = [
    { label: 'Projects', href: '/projects' },
    { label: 'Research', href: '/research' },
    { label: 'People', href: '/people' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
  ]

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          {labName}
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
