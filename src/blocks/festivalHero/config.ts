import type { Block } from 'payload'

export const FestivalHero: Block = {
  slug: 'festivalHero',

  labels: {
    singular: 'Festival Hero',
    plural: 'Festival Heroes',
  },

  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}