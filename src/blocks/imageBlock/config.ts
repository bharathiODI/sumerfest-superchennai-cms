import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'imageBlock',

  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },

  fields: [
    {
      name: 'image',
      label: 'Desktop Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'mobileImage',
      label: 'Mobile Image',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'title',
      type: 'text',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'buttonText',
      type: 'text',
    },

    {
      name: 'buttonLink',
      type: 'text',
    },

    {
      name: 'imageLink',
      type: 'text',
      label: 'Image Click Link',
    },

    {
      name: 'imageHeight',
      type: 'select',
      defaultValue: 'medium',

      options: [
        {
          label: 'Small',
          value: 'small',
        },

        {
          label: 'Medium',
          value: 'medium',
        },

        {
          label: 'Large',
          value: 'large',
        },
      ],
    },
  ],
}