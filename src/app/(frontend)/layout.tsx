import { getPayloadClient } from '@/lib/payload'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './styles.css'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <html lang="en">
      <body>
        <Navbar labName={settings.labName} />
        <main>{children}</main>
        <Footer
          labName={settings.labName}
          collegeName={settings.collegeName}
          socialLinks={settings.socialLinks}
        />
      </body>
    </html>
  )
}
