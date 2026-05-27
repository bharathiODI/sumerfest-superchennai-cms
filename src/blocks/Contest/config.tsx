import { Block } from 'payload';

export const MargazhiEventsBlock: Block = {
  slug: 'margazhiEvents',
  labels: {
    singular: 'Margazhi Events Section',
    plural: 'Margazhi Events Sections',
  },
  fields: [
    {
      name: 'sections',
      type: 'array', // <-- array of sections
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          defaultValue: 'Margazhi Events',
        },
        /* -------- Events by Date -------- */
        {
          name: 'eventsByDate',
          type: 'array',
          fields: [
            {
              name: 'date',
              type: 'date',
            },
            {
              name: 'events',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'margazhiContestCategories',
                },
                {
                  name: 'subCategory',
                  type: 'text',
                },
                {
                  name: 'time',
                  type: 'text',
                },
                {
                  name: 'place',
                  type: 'relationship',
                  relationTo: 'venues',
                },
                {
                  name: 'musicians',
                  type: 'text',
                },
                {
                  name: 'organizers',
                  type: 'relationship',
                  relationTo: 'organizers',
                  admin: {
                    description: 'Select one or more organizers for this event',
                  },
                },
              ],
            },
          ],
        },
        /* -------- Display -------- */
        {
          name: 'displayMode',
          type: 'select',
          defaultValue: 'calendar',
          options: [
            { label: 'Calendar View', value: 'calendar' },
            { label: 'List View', value: 'list' },
            { label: 'Compact List', value: 'compact' },
          ],
        },
      ],
    },
  ],
};
