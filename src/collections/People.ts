import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'PI / Lab Director', value: 'pi' },
        { label: 'PhD Student', value: 'phd' },
        { label: 'JRF', value: 'jrf' },
        { label: 'Intern', value: 'intern' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'links',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'googleScholar', type: 'text', label: 'Google Scholar URL' },
        { name: 'researchGate', type: 'text', label: 'ResearchGate URL' },
        { name: 'cv', type: 'upload', relationTo: 'media', label: 'CV / Resume PDF' },
      ],
    },
    {
      name: 'researchInterests',
      type: 'array',
      label: 'Research Interest Tags',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower number = appears first within the same role group',
      },
    },
  ],
}
