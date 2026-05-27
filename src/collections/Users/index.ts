import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'profileImage'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Client', value: 'client' },
        { label: 'User', value: 'user' },
      ],
    },

    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },

    {
      name: 'location',
      type: 'text',
      required: false,
    },

    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        description: 'Upload author profile photo (square image preferred)',
      },
    },

    {
      name: 'phoneVerified',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'otp',
      type: 'text',
      admin: { hidden: true },
    },

    {
      name: 'otpExpires',
      type: 'date',
      admin: { hidden: true },
    },
  ],
  timestamps: true,
}






// import type { CollectionConfig } from 'payload'

// import { authenticated } from '../../access/authenticated'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   access: {
//     admin: authenticated,
//     create: authenticated,
//     delete: authenticated,
//     read: authenticated,
//     update: authenticated,
//   },
//   admin: {
//     defaultColumns: ['name', 'email','profileImage'],
//     useAsTitle: 'name',
//   },
//   auth: true,
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//     },
//      {
//       name: 'profileImage',
//       type: 'upload',
//       relationTo: 'media',
//       label: 'Profile Image',
//       admin: {
//         description: 'Upload author profile photo (square image preferred)',
//       },
//     },
//   ],
//   timestamps: true,
// }
