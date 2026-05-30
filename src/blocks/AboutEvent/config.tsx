import type { Block } from 'payload'

export const AboutEventBlock: Block = {
  slug: 'aboutEventBlock',

  labels: {
    singular: 'About Event Block',
    plural: 'About Event Blocks',
  },

  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'ABOUT',
    },

    {
      name: 'highlightText',
      type: 'text',
      defaultValue: 'THE EVENT',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    /* =========================================
       IMAGE
    ========================================= */

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },

    /* =========================================
       HIGHLIGHTS
    ========================================= */

    {
      name: 'highlights',
      type: 'array',

      fields: [
        {
          name: 'title',
          type: 'text',
        },

        {
          name: 'subtitle',
          type: 'text',
        },

        /* =========================
       CUSTOM ICON TEXT
    ========================= */
        {
          name: 'iconText',
          type: 'text',
          admin: {
            placeholder: 'Ex: 🎵 or A or 01',
          },
        },

        /* =========================
       CUSTOM COLOR
    ========================= */
        {
          name: 'color',
          type: 'text',
          admin: {
            placeholder: '#005B70',
          },
        },

        /* =========================
       SVG / IMAGE UPLOAD
    ========================= */
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    /* =========================================
       LOCATION
    ========================================= */

    {
      name: 'locationTitle',
      type: 'text',
      defaultValue: 'Event Location',
    },

    {
      name: 'locationAddress',
      type: 'textarea',
    },

    {
      name: 'mapLink',
      type: 'text',
    },
  ],
}