import type { CollectionConfig } from 'payload'

export const FestivalWeeks: CollectionConfig = {
  slug: 'festival-weeks',

  admin: {
    useAsTitle: 'title',
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
    },

    {
      name: 'weekNumber',
      type: 'number',
      required: true,
    },

    {
      name: 'startDate',
      type: 'date',
    },

    {
      name: 'endDate',
      type: 'date',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}