import type { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'type', 'authors'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'authors',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Sharma R., Verma A., Kumar P."',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1990,
      admin: {
        description: 'Publication year e.g. 2024',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Journal', value: 'journal' },
        { label: 'Conference', value: 'conference' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Book Chapter', value: 'book-chapter' },
        { label: 'Preprint', value: 'preprint' },
      ],
    },
    {
      name: 'venueName',
      type: 'text',
      required: true,
      label: 'Conference / Journal Name',
      admin: {
        description: 'e.g. "IEEE Transactions on Power Systems" or "NeurIPS 2024"',
      },
    },
    {
      name: 'researchAreas',
      type: 'relationship',
      relationTo: 'research-areas',
      hasMany: true,
      label: 'Research Areas',
      admin: {
        description: 'Used for filtering on the Research page',
      },
    },
    {
      name: 'abstract',
      type: 'textarea',
      admin: {
        description: 'Optional — shown on hover or expanded view',
      },
    },
    {
      name: 'doi',
      type: 'text',
      label: 'DOI',
      admin: {
        description: 'e.g. 10.1109/TPWRS.2024.123456',
      },
    },
    {
      name: 'paperLink',
      type: 'text',
      label: 'Paper URL',
      admin: {
        description: 'Direct link — DOI URL, arXiv, or PDF. Used if DOI is not available.',
      },
    },
    {
      name: 'pdfUpload',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF Upload',
      admin: {
        description: 'Optional — upload the paper PDF directly',
      },
    },
  ],
}
