import type { CollectionConfig } from 'payload'

export const SummerRegistrations: CollectionConfig = {
  slug: 'summer-registrations',

  admin: {
    useAsTitle: 'name',

    defaultColumns: ['name', 'email', 'status', 'thankYouMailSent', 'createdAt'],

    group: 'USER RESGISTARTIONS',
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [
    /* ======================================================
       EVENT RELATION
    ====================================================== */

    {
      name: 'summer',
      label: 'summer Event',
      type: 'relationship',
      relationTo: 'summer-events',
      required: false,

      admin: {
        width: '50%',
      },
    },
    {
      name: 'week',
      label: 'Festival Week',
      type: 'relationship',
      relationTo: 'festival-weeks',

      admin: {
        hidden: true,
      },
    },

    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',

      options: [
        {
          label: 'Pending',
          value: 'pending',
        },

        {
          label: 'Confirmed',
          value: 'confirmed',
        },

        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],

      admin: {
        width: '50%',
      },
    },

    /* ======================================================
       USER INFO
    ====================================================== */

    {
      type: 'row',

      fields: [
        {
          name: 'name',
          type: 'text',

          admin: {
            width: '50%',
          },
        },

        {
          name: 'email',
          type: 'email',

          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      type: 'row',

      fields: [
        {
          name: 'phone',
          type: 'text',

          admin: {
            width: '50%',
          },
        },

        {
          name: 'company',
          type: 'text',

          admin: {
            width: '50%',
          },
        },
      ],
    },

    /* ======================================================
       REGISTRATION DATA
    ====================================================== */

    {
      name: 'values',
      label: 'Registration Form Data',
      type: 'json',

      admin: {
        description: 'Dynamic submitted form values',
        components: {
          Field: '@/collections/SummerFestEvents/components/RegistrationViewer',
        },
      },
    },

    /* ======================================================
   FILES
====================================================== */

    {
      name: 'attachments',
      label: 'Uploaded Files',
      type: 'array',

      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },

        {
          name: 'fieldName',
          type: 'text',
        },
      ],
    },

    /* ======================================================
       MAIL SETTINGS
    ====================================================== */

    {
      type: 'collapsible',

      label: 'Email Management',

      fields: [
        {
          type: 'row',

          fields: [
            {
              name: 'thankYouMailSent',
              type: 'checkbox',

              defaultValue: false,

              admin: {
                width: '50%',
                readOnly: true,
              },
            },

            {
              name: 'confirmedAt',
              type: 'date',

              admin: {
                width: '50%',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
          ],
        },

        {
          name: 'adminMessage',
          type: 'textarea',

          admin: {
            description: 'This message will be included in confirmation mail.',
          },
        },

        {
          name: 'mailResponse',
          type: 'textarea',

          admin: {
            readOnly: true,
          },
        },
      ],
    },

    /* ======================================================
       ADMIN ACTIONS
    ====================================================== */

    // {
    //   name: 'sendThankYouMail',
    //   type: 'ui',

    //   admin: {
    //     components: {
    //       Field: '@/collections/Arrattai/components/SendThankYouButton',
    //     },
    //   },
    // },
  ],

  timestamps: true,
}
