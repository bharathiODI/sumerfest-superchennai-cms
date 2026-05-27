import type { CollectionConfig } from 'payload'

export const EventDashboard: CollectionConfig = {
  slug: 'event-dashboard',

  admin: {
    group: 'Events Management',

    components: {
      views: {
        list: {
          Component:
            '@/collections/EventDashboard/components/Dashboard',
        },
      },
    },
  },

  fields: [],
}