import { Block } from 'payload'

export const FestivalScheduleBlock: Block = {
  slug: 'festivalScheduleBlock',
  labels: {
    singular: 'Festival Schedule',
    plural: 'Festival Schedule',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'contest',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Maaza Quiz & Photography Contest',
    },
    {
      name: 'contests',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'startDate',
          type: 'text',
          required: true,
        },
        {
          name: 'badgeType',
          type: 'text',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          
          admin: {
            description: 'External URL for Participate Now button',
          },
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}