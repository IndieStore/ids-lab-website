import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'labName',
      type: 'text',
      required: true,
      label: 'Lab Name',
      admin: {
        description: 'e.g. "Intelligent Systems Design Lab"',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline',
      admin: {
        description: 'One-line tagline shown on the banner',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Background Image',
    },
    {
      name: 'about',
      type: 'group',
      label: 'About the Lab',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'About Content',
          admin: {
            description: '2–3 paragraphs on mission, vision, and area of work',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Details',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Lab Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Lab Phone',
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            { name: 'building', type: 'text', label: 'Building' },
            { name: 'room', type: 'text', label: 'Room Number' },
            { name: 'college', type: 'text', label: 'College Name' },
            { name: 'city', type: 'text', label: 'City' },
            { name: 'state', type: 'text', label: 'State' },
            { name: 'pin', type: 'text', label: 'PIN Code' },
          ],
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'Paste the src URL from the Google Maps embed iframe',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'twitter', type: 'text', label: 'Twitter / X URL' },
        { name: 'github', type: 'text', label: 'GitHub URL' },
        { name: 'researchGate', type: 'text', label: 'ResearchGate URL' },
      ],
    },
    {
      name: 'collegeName',
      type: 'text',
      required: true,
      label: 'College Name',
      admin: {
        description: 'Shown in the footer',
      },
    },
  ],
}
