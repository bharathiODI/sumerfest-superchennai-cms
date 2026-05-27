import { CollectionConfig } from 'payload'

export const EventFormFields: CollectionConfig = {
  slug: 'event-form-fields',

  admin: {
    useAsTitle: 'label',
  },

  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },

    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'type',
      type: 'select',

      options: [
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Number',
          value: 'number',
        },
        {
          label: 'Textarea',
          value: 'textarea',
        },
        {
          label: 'Select',
          value: 'select',
        },
        {
          label: 'Radio',
          value: 'radio',
        },
        {
          label: 'Checkbox',
          value: 'checkbox',
        },
        {
          label: 'File Upload',
          value: 'file',
        },
      ],
    },

    {
      name: 'placeholder',
      type: 'text',
    },

    {
      name: 'required',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'options',
      type: 'array',

      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'select' || siblingData?.type === 'radio',
      },

      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
  ],
}