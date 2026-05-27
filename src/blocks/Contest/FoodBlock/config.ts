import type { Block } from 'payload'

export const ContestFoodBlock: Block = {
  slug: 'contestfoodBlock',
  labels: {
    singular: 'Food & Canteen Section',
    plural: 'Food & Canteen Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Foods & Canteen',
      admin: {
        placeholder: 'Example: Best Margazhi Canteens & Snacks',
        description:
          'This title appears above the food cards on the website.',
      },
    },
    {
      name: 'foods',
      type: 'relationship',
      relationTo: 'sabhaFoods',
      hasMany: true,
      required: true,
      admin: {
        description:
          'Select food spots or canteens related to Margazhi season. These will be shown as cards on the page.',
      },
    },
  ],
}
