import type { Block } from 'payload'

export const PartnerCarouselBlock: Block = {
  slug: 'partnerCarouselBlock',
  labels: {
    singular: 'Partner Carousel',
    plural: 'Partner Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Partners',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}