import Link from 'next/link'

type SocialLinks = {
  linkedin?: string | null
  twitter?: string | null
  github?: string | null
  researchGate?: string | null
}

type Props = {
  labName: string
  collegeName: string
  socialLinks?: SocialLinks | null
}

export default function Footer({ labName, collegeName, socialLinks }: Props) {
  const year = new Date().getFullYear()

  const socials = [
    { key: 'linkedin', label: 'LinkedIn', href: socialLinks?.linkedin },
    { key: 'twitter', label: 'Twitter / X', href: socialLinks?.twitter },
    { key: 'github', label: 'GitHub', href: socialLinks?.github },
    { key: 'researchGate', label: 'ResearchGate', href: socialLinks?.researchGate },
  ].filter((s) => s.href)

  return (
    <footer className="w-full border-t bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-800">{labName}</p>
          <p className="text-sm text-gray-500">{collegeName}</p>
          <p className="text-xs text-gray-400 mt-1">© {year} All rights reserved.</p>
        </div>

        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <Link
                key={s.key}
                href={s.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
