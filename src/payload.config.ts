import { postgresAdapter } from '@payloadcms/db-postgres'
import 'dotenv/config'

import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'

import { defaultLexical } from 'src/fields/defaultLexical'
import { Users } from './collections/Users'
import { verifyOTP } from './endpoints/verifyOTP'
import Footer from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'
import { Partners } from './collections/Partners'
import { SummerFestEvents } from './collections/SummerFestEvents'
import { Performers } from './collections/Performers'
import { Venues } from './collections/Venues'
import { PartnerCategories } from './collections/Partners/options/PartnerTypes'
import { EventTypes } from './collections/SummerFestEvents/options/EventTypes'
import { FestivalWeeks } from './collections/SummerFestEvents/options/FestivalWeeks'
import { EventFormFields } from './collections/SummerFestEvents/options/EventFormFields'
import { SummerRegistrations } from './collections/SummerFestEvents/SummerRegistrations'
import { EventDashboard } from './collections/EventDashboard'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      views: {},
      graphics: {
        Logo: '@/components/admin/AdminLogo',
        Icon: '@/components/admin/AdminIcon',
      },
    },

    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,

  db: postgresAdapter({
    pool: {
      max: 10,
      connectionString: process.env.DATABASE_URI,

      connectionTimeoutMillis: 300000,
      idleTimeoutMillis: 300000,
    },
  }),

  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Partners,
    Performers,
    SummerFestEvents,
    Venues,
    PartnerCategories,
    EventTypes,
    FestivalWeeks,
    EventFormFields,
    SummerRegistrations,
    EventDashboard,
  ],

  //######### CUSTOME END POINT  ###############

  endpoints: [
    {
      path: '/verify-otp',
      method: 'post',
      handler: verifyOTP,
    },
  ],

  // #################################################################################
  // ################## DONT TOCH THIS PART MODIFIED BY OPEN DESIGN  #################
  // #################################################################################

  cors: [
    'https://www.superchennai.com',
    'http://localhost:5173',
    'http://localhost:5174',
    getServerSideURL(),
  ].filter(Boolean),

  globals: [Header, Footer],
  blocks: [],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
