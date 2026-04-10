import type { CollectionConfig } from 'payload'

export const ResearchAreas: CollectionConfig = {
  slug: 'research-areas',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Area Name',
      admin: {
        description: 'e.g. "Machine Learning", "Power Systems"',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon / Illustration',
      admin: {
        description: 'Small icon or illustration shown on the tile (SVG or PNG recommended)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: '2-line description shown on the tile',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order on the Research page (lower = first)',
      },
    },
  ],
}
