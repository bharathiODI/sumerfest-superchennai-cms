// src/blocks/eventRegistration/config.ts

import type { Block } from 'payload'

export const EventRegistrationBlock: Block = {
  slug: 'eventRegistration',

  labels: {
    singular: 'Event Registration',
    plural: 'Event Registrations',
  },

  fields: [
    {
      name: 'registrationTitle',
      label: 'Registration Title',
      type: 'text',
      defaultValue: 'REGISTER FOR THIS EVENT',
    },

    {
      name: 'registrationDescription',
      label: 'Registration Description',
      type: 'textarea',
    },

    {
      name: 'registrationImage',
      label: 'Registration Image',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'registrationPoints',
      label: 'Registration Points',
      type: 'array',

      fields: [
        {
          name: 'point',
          label: 'Point',
          type: 'text',
        },
      ],

      defaultValue: [
        {
          point: 'Entry for all – Open for individuals, friends, and families.',
        },
        {
          point: 'Easy on-spot registration – Register at the venue and get your entry pass.',
        },
        {
          point: 'Bring your ID – Carry a valid ID proof for quick registration.',
        },
        {
          point: 'Come & Enjoy – Great food, live music, fun zones and unforgettable memories await!',
        },
      ],
    },

    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Register Now',
    },

    {
      name: 'buttonLink',
      label: 'Button Link',
      type: 'text',
      defaultValue: '/register',
    },
  ],
}