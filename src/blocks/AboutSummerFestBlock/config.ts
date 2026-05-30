import { Block } from 'payload'

export const AboutSummerFestBlock: Block = {
  slug: 'aboutSummerFestBlock',
  labels: {
    singular: 'About Summer Fest',
    plural: 'About Summer Fest',
  },
  fields: [
    {
      name: 'aboutLabel',
      type: 'text',
      defaultValue: 'ABOUT',
    },
    {
      name: 'titleRed',
      type: 'text',
      defaultValue: 'SUPER CHENNAI',
    },
    {
      name: 'titleBlue',
      type: 'text',
      defaultValue: 'SUMMER FEST',
    },
    {
      name: 'year',
      type: 'text',
      defaultValue: '2026',
    },
    {
      name: 'tagline',
      type: 'textarea',
      defaultValue:
        'Summer in Chennai is not just a season. It is an identity.',
    },
    {
      name: 'description1',
      type: 'textarea',
    },
    {
      name: 'description2',
      type: 'textarea',
    },
    {
      name: 'description3',
      type: 'textarea',
    },
    {
      name: 'footerTitle',
      type: 'text',
      defaultValue: "Because Chennai doesn't escape summer.",
    },
    {
      name: 'footerHighlight',
      type: 'text',
      defaultValue: 'Chennai celebrates it.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}