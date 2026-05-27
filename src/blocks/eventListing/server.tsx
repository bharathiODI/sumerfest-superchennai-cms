
// import { getPayload } from 'payload'
// import configPromise from '@/payload.config'

// import EventListingComponent from './Component'

// type Props = {
//   heading?: string
//   description?: string
//   limit?: number
//   featuredOnly?: boolean
//   showViewAll?: boolean
//   viewAllLink?: string
// }

// export default async function EventListingBlock({
//   heading,
//   description,
//   limit = 6,
//   featuredOnly = false,
//   showViewAll = true,
//   viewAllLink = '/summer',
// }: Props) {
//   const payload = await getPayload({
//     config: configPromise,
//   })

//   const eventsRes = await payload.find({
//     collection: 'summer-events',
//     depth: 3,
//     limit,
//     sort: '-createdAt',
//     where: featuredOnly
//       ? {
//           'eventFields.featured': {
//             equals: true,
//           },
//         }
//       : {},
//   })

//   const events = eventsRes.docs || []

//   return (
//     <EventListingComponent
//       heading={heading}
//       description={description}
//       events={events}
//       showViewAll={showViewAll}
//       viewAllLink={viewAllLink}
//     />
//   )
// }