import type { CollectionConfig } from 'payload'

import { slugField } from 'src/fields/slug'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import { AboutEventBlock } from '@/blocks/AboutEvent/config'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { EventRegistrationBlock } from '@/blocks/eventRegistrationPoints/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { PartnerCarouselBlock } from '@/blocks/Partners/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'
import { SEOFieldSchema } from '@/fields/seo'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { EventRegistrationFormBlock } from '@/blocks/EventRegistrationForm/config'

export const SummerFestEvents: CollectionConfig<'summer-events'> = {
  slug: 'summer-events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'summer-events',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'summer-events',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'mobileImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({
                      blocks: [
                        Banner,
                        Code,
                        MediaBlock,
                        VideoBlock,
                        EventRegistrationBlock,
                        PartnerCarouselBlock,
                        AboutEventBlock,
                        EventRegistrationFormBlock,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
            },
          ],
          label: 'Content',
        },

        //######### FIELD CONTENTS #################
        {
          name: 'eventFields',
          label: 'EventFields',

          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },

            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
            },

            {
              name: 'shortDescription',
              type: 'textarea',
            },

            {
              name: 'description',
              type: 'richText',
            },

            {
              name: 'eventDates',
              type: 'array',
              label: 'Event Dates',
              labels: {
                singular: 'Event Date',
                plural: 'Event Dates',
              },
              admin: {
                description:
                  'Add one or more dates for the event (example: show multiple dates if the event happens on different days)',
              },
              fields: [
                {
                  name: 'date',
                  type: 'date',

                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    placeholder: 'Select event date',
                  },
                },
              ],
            },

            {
              name: 'startTime',
              type: 'text',
            },

            {
              name: 'endTime',
              type: 'text',
            },

            {
              name: 'week',
              type: 'relationship',
              relationTo: 'festival-weeks',
            },

            {
              name: 'eventType',
              type: 'relationship',
              relationTo: 'event-types',
            },

            {
              name: 'venue',
              type: 'relationship',
              relationTo: 'venues',
            },

            {
              name: 'performers',
              type: 'relationship',
              relationTo: 'performers',
              hasMany: true,
            },

            {
              name: 'partners',
              type: 'relationship',
              relationTo: 'partners',
              hasMany: true,
            },

            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },

            // {
            //   name: 'gallery',
            //   type: 'upload',
            //   relationTo: 'media',
            //   hasMany: true,
            // },

            {
              name: 'ticketType',
              type: 'select',
              options: ['Free', 'Ticketed', 'Registration Required'],
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },

        {
          name: 'formSettings',
          label: 'formSettings',

          fields: [
            /* =========================================================
                REGISTRATION SETTINGS
             ========================================================= */

            {
              name: 'regSettings',
              type: 'group',

              fields: [
                {
                  name: 'isRegistrationOpen',
                  type: 'checkbox',
                  defaultValue: true,
                },

                {
                  name: 'enableOTP',
                  type: 'checkbox',
                  defaultValue: true,
                },

                {
                  name: 'maxRegistrations',
                  type: 'number',
                },

                {
                  name: 'showOrganisationField',
                  type: 'checkbox',
                  defaultValue: true,
                },

                {
                  name: 'thankYouMessage',
                  type: 'textarea',
                },
              ],
            },

            /* =========================================================
            DYNAMIC FORM FIELDS
            ========================================================= */

            {
              name: 'customFields',
              label: 'Custom Form Fields',
              type: 'relationship',
              relationTo: 'event-form-fields',
              hasMany: true,
            },
          ],
        },

        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            {
              name: 'schema',
              type: 'json',
              label: 'Structured Data (JSON-LD)',
              admin: {
                description: 'Paste valid JSON-LD schema (Event schema for SEO)',
              },
            },
            SEOFieldSchema,
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
