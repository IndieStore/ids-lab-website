import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'fundingAgency'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL-friendly identifier e.g. "smart-grid-analysis". Auto-fill this from the title.',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on the project card (2–3 lines)',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Shown on the project detail page',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Keywords / Tags',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'ongoing',
    },
    {
      name: 'teamMembers',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      label: 'Team Members',
    },
    {
      name: 'timeline',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'monthOnly' } },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'monthOnly' },
            description: 'Leave empty if ongoing',
          },
        },
      ],
    },
    {
      name: 'fundingAgency',
      type: 'text',
      label: 'Funding Agency',
      admin: {
        description: 'e.g. DST, SERB, ISRO — leave blank if none',
      },
    },
    {
      name: 'linkedPublications',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: true,
      label: 'Linked Publications',
    },
  ],
}
