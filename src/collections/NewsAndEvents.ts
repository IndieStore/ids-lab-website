import type { CollectionConfig } from 'payload'

export const NewsAndEvents: CollectionConfig = {
  slug: 'news-and-events',
  labels: {
    singular: 'News & Event',
    plural: 'News & Events',
  },
  admin: {
    useAsTitle: 'eventName',
    defaultColumns: ['eventName', 'type', 'date', 'createdAt'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'News', value: 'news' },
        { label: 'Event', value: 'event' },
      ],
      defaultValue: 'news',
    },
    {
      name: 'eventName',
      label: 'Event/News Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: false,
      admin: {
        condition: (data, siblingData, { user }) => siblingData.type === 'event',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Event Images',
      required: false,
      admin: {
        condition: (data, siblingData, { user }) => siblingData.type === 'event',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
