import type { Block } from 'payload'

export const GalleryVisualDiaryBlock: Block = {
  slug: 'galleryVisualDiary',

  labels: {
    singular: 'Gallery Visual Diary',
    plural: 'Gallery Visual Diaries',
  },

  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'Gallery',
    },
    {
      name: 'headingRed',
      type: 'text',
      defaultValue: 'Summer Fest',
    },
    {
      name: 'headingBlue',
      type: 'text',
      defaultValue: 'Visual Diary',
    },
    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'viewMoreText',
      type: 'text',
      defaultValue: 'View More',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'backgroundOverlay',
      label: 'Enable Overlay',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'overlayOpacity',
      label: 'Overlay Opacity',
      type: 'number',
      defaultValue: 30,
      min: 0,
      max: 100,
    },

    {
      name: 'tabs',
      type: 'array',
      label: 'Gallery Tabs',

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'images',
          type: 'array',
          minRows: 5,
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
    },
  ],
}