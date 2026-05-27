import type { CollectionConfig } from 'payload'

export const EventTypes: CollectionConfig = {
  slug: 'event-types',

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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'color',
      type: 'text',
    },

    {
      name: 'description',
      type: 'textarea',
    },
  ],
}