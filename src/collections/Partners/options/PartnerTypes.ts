import type { CollectionConfig } from 'payload'

export const PartnerCategories: CollectionConfig = {
  slug: 'partner-categories',

  labels: {
    singular: 'Partner Category',
    plural: 'Partner Categories',
  },

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      label: 'Partner Type Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Example: Food Partner, Movie Partner',
      },
    },

    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Example: food-partner',
      },
    },

    {
      name: 'description',
      label: 'Short Description',
      type: 'textarea',
      admin: {
        description: 'Short explanation about this partner category',
      },
    },

    {
      name: 'icon',
      label: 'Category Icon',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'themeColor',
      label: 'Theme Color',
      type: 'text',
      admin: {
        description: 'Example: #FF5733',
      },
    },
  ],
}