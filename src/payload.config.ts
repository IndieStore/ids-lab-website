import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import imagekitPlugin from 'payloadcms-plugin-imagekit'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { People } from './collections/People'
import { Projects } from './collections/Projects'
import { Publications } from './collections/Publications'
import { ResearchAreas } from './collections/ResearchAreas'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, People, Projects, Publications, ResearchAreas],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        endpoint: process.env.IMAGEKIT_ENDPOINT!,
      },
      collections: {
        media: {
          uploadOption: {
            folder: 'ids-website-media',
            extensions: [
              {
                name: 'aws-auto-tagging',
                minConfidence: 80, // only tags with a confidence value higher than 80% will be attached
                maxTags: 10, // a maximum of 10 tags from aws will be attached
              },
              {
                name: 'google-auto-tagging',
                minConfidence: 70, // only tags with a confidence value higher than 70% will be attached
                maxTags: 10, // a maximum of 10 tags from google will be attached
              },
            ],
          },
          savedProperties: ['url', 'AITags'],
        },
      },
    }),
  ],
})
