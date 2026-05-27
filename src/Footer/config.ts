import { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // FOOTER LOGO
    {
      type: 'upload',
      name: 'logo',
      label: 'Footer Logo',
      relationTo: 'media',
    },

    // FOOTER DESCRIPTION
    {
      type: 'textarea',
      name: 'description',
      label: 'Footer Description',
    },

    // QUICK LINKS
    {
      type: 'array',
      name: 'quickLinks',
      label: 'Quick Links',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Label',
          required: true,
        },
        {
          type: 'text',
          name: 'link',
          label: 'Link',
          required: true,
        },
      ],
    },

    // SOCIAL MEDIA LINKS
    {
      type: 'array',
      name: 'socialLinks',
      label: 'Social Links',
      fields: [
        {
          type: 'text',
          name: 'platform',
          label: 'Platform Name',
          required: true,
        },
        {
          type: 'text',
          name: 'link',
          label: 'URL',
          required: true,
        },
      ],
    },

    // COPYRIGHT TEXT
    {
      type: 'text',
      name: 'copyright',
      label: 'Copyright Text',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

export default Footer
