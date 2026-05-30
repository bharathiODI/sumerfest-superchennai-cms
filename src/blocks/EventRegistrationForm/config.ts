import type { Block } from 'payload'

export const EventRegistrationFormBlock: Block = {
  slug: 'eventRegistrationFormBlock',

  labels: {
    singular: 'Event Registration Form',
    plural: 'Event Registration Forms',
  },

  fields: [
    {
      name: 'showForm',
      type: 'checkbox',
      defaultValue: true,
    },

    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Register For This Event',
    },

    {
      name: 'sectionSubTitle',
      type: 'text',
      defaultValue: 'Submit Your Data',
    },

    {
      name: 'sectionDescrption',
      type: 'text',
      defaultValue:
        'Fill out the registration form below to participate in this event. Our team will contact you with further details after submission.',
    },

    {
      name: 'enableGlassEffect',
      type: 'checkbox',
      defaultValue: true,
    },

    /* =========================================================
       ENABLE / DISABLE IMAGE
    ========================================================= */

    {
      name: 'showImage',
      label: 'Show Side Image',
      type: 'checkbox',
      defaultValue: false,
    },

    /* =========================================================
       IMAGE
    ========================================================= */

    {
      name: 'sideImage',
      label: 'Side Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.showImage,
      },
    },

    /* =========================================================
       IMAGE POSITION
    ========================================================= */

    {
      name: 'imagePosition',
      label: 'Image Position',
      type: 'select',
      defaultValue: 'left',

      options: [
        {
          label: 'Left',
          value: 'left',
        },

        {
          label: 'Right',
          value: 'right',
        },
      ],

      admin: {
        condition: (_, siblingData) => siblingData?.showImage,
      },
    },
  ],
}
