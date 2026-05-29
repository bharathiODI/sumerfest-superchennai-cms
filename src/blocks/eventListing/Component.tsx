'use client'

import React, { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'

import './style.css'

type Props = {
  heading?: string
  description?: string
  showViewAll?: boolean
  viewAllLink?: string
}

export default function EventListingComponent({
  heading,
  description,
  showViewAll = true,
  viewAllLink = '/summer',
}: Props) {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [activeWeek, setActiveWeek] = useState<string>('all')

  /* ======================================================
     FETCH EVENTS
  ====================================================== */

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)

      const res = await axios.get('/api/summer-events-lisings')

      setEvents(res?.data?.docs || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /* ======================================================
     WEEK LIST
  ====================================================== */

  const weeks = useMemo(() => {
    const allWeeks = events?.map((event) => event?.eventFields?.week) || []

    const uniqueWeeks = allWeeks.filter(
      (week, index, self) => week && index === self.findIndex((w) => w?.id === week?.id),
    )

    return uniqueWeeks.sort((a: any, b: any) => (a?.weekNumber || 0) - (b?.weekNumber || 0))
  }, [events])

  /* ======================================================
     FILTER EVENTS
  ====================================================== */

  // const filteredEvents =
  //   activeWeek === 'all'
  //     ? events
  //     : events.filter((event) => String(event?.eventFields?.week?.id) === activeWeek)

  const now = new Date()

  const filteredEvents = (
    activeWeek === 'all'
      ? events
      : events.filter((event) => String(event?.eventFields?.week?.id) === activeWeek)
  ).sort((a, b) => {
    const aDate = new Date(a?.eventFields?.eventDates?.[0]?.date || 0)
    const bDate = new Date(b?.eventFields?.eventDates?.[0]?.date || 0)

    const aPast = aDate < now
    const bPast = bDate < now

    // Upcoming events first
    if (aPast !== bPast) {
      return aPast ? 1 : -1
    }

    // Sort by nearest date
    return aDate.getTime() - bDate.getTime()
  })

  /* ======================================================
     HELPERS
  ====================================================== */

  const WaveDecoration = () => (
    <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
      ~~~
    </span>
  )

  const categoryStyles: Record<
    string,
    {
      bg: string
      text: string
    }
  > = {
    Music: {
      bg: 'bg-[#007A87]',
      text: 'text-[#007A87]',
    },

    Food: {
      bg: 'bg-[#E0533C]',
      text: 'text-[#E0533C]',
    },

    'Art & Culture': {
      bg: 'bg-[#E5A93C]',
      text: 'text-[#E5A93C]',
    },
  }

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return <div className="py-24 text-center text-xl font-bold">Loading Events...</div>
  }

  if (!events?.length) return null

  return (
    <section
      className="relative overflow-hidden bg-white py-5 "
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 mt-10">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 text-center">
          <h1 className="sr-only">{heading}</h1>
          <h2 className="text-sm font-bold tracking-widest text-[#061E43] flex items-center justify-center uppercase festmainheadingsss">
            <WaveDecoration />

            {heading || ''}

            <WaveDecoration />
          </h2>

          {/* {description && (
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600">
              {description}
            </p>
          )} */}
        </div>

        {/* ======================================================
            WEEK TABS
        ====================================================== */}

        <div className="mb-14 grid grid-cols-2 gap-9 md:grid-cols-5">
          <button
            onClick={() => setActiveWeek('all')}
            className={`rounded-xl border px-4 py-4 text-center transition-all ${
              activeWeek === 'all'
                ? 'border-[#005B70] bg-[#005B70] font-semibold text-white shadow-md'
                : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300'
            }`}
          >
            <div className="text-[10px] uppercase font-semibold tracking-widest opacity-90 festviewwdetails">
              ALL EVENTS
            </div>

            <div
              className={`text-xs font-bold mt-1 festparaa ${
                activeWeek === 'all' ? ' !text-white ' : ''
              } `}
            >
              Summer Fest
            </div>
          </button>

          {weeks.map((week: any) => {
            const startDate = week?.startDate
              ? new Date(week.startDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
              : ''

            const endDate = week?.endDate
              ? new Date(week.endDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
              : ''

            return (
              <button
                key={week?.id}
                onClick={() => setActiveWeek(String(week?.id))}
                className={`rounded-xl border px-4 py-4 text-center transition-all ${
                  activeWeek === String(week?.id)
                    ? 'border-[#005B70] bg-[#005B70] font-semibold text-white shadow-md'
                    : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold tracking-widest opacity-90 festviewwdetails">
                  {week?.title || `WEEK ${week?.weekNumber}`}
                </div>

                <div className="text-xs font-bold mt-1 festparaa ">
                  {startDate} - {endDate}
                </div>
              </button>
            )
          })}
        </div>

        {/* ======================================================
            ACTIVE WEEK TITLE
        ====================================================== */}
        {/* 
        <div className="mb-10 text-center">
          <h3 className="text-sm font-extrabold tracking-widest text-[#061E43] flex items-center justify-center uppercase festmainheadingsss">
            <WaveDecoration />

            {activeWeek === 'all'
              ? 'ALL FESTIVAL EVENTS'
              : weeks.find((w: any) => String(w?.id) === activeWeek)?.title}

            <WaveDecoration />
          </h3>
        </div> */}

        {/* ======================================================
            EVENTS GRID
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-[30px]">
          {filteredEvents.map((event: any, index: number) => {
            const eventData = event?.eventFields || {}

            const category = eventData?.eventType?.title || 'EVENT'

            const categoryStyle = categoryStyles[category] || {
              bg: 'bg-orange-500',
              text: 'text-orange-500',
            }

            const image =
              eventData?.featuredImage?.sizes?.large?.url ||
              eventData?.featuredImage?.url ||
              '/placeholder.jpg'

            const title = eventData?.title || event?.title

            const shortDescription = eventData?.shortDescription

            const venue = eventData?.venue?.title

            const startTime = eventData?.startTime

            const endTime = eventData?.endTime

            const slug = event?.slug

            const eventDate = eventData?.eventDates?.[0]?.date

            const formattedDate = eventDate
              ? new Date(eventDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : ''

            return (
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                key={event?.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                {/* <Link
                  href={`/summerFestEvents/${slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                > */}
                {/* IMAGE */}
                <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* CATEGORY */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-[13px] font-bold text-white rounded-full  tracking-widest ${categoryStyle.bg}`}
                  >
                    {category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* TITLE */}

                    <h3 className="text-lg font-bold text-[#061E43] mb-4 tracking-wide festheadingsss">
                      {title}
                    </h3>

                    {/* DESCRIPTION */}
                    {shortDescription && (
                      <p className="text-xs text-[#000] line-clamp-2 mb-3 leading-relaxed font-medium  festparaa !text-[16px]">
                        {shortDescription}
                      </p>
                    )}

                    {/* META */}
                    <div className="space-y-3  text-[#000] font-medium tracking-wide festesssss">
                      {/* DATE */}
                      {formattedDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className={`h-4 w-4 ${categoryStyle.text}`} strokeWidth={2.5} />

                          <span className="festparaa">{formattedDate}</span>
                        </div>
                      )}

                      {/* TIME */}
                      {(startTime || endTime) && (
                        <div className="flex items-center gap-2 !mt-0">
                          <Clock className={`h-4 w-4 ${categoryStyle.text}`} strokeWidth={2.5} />

                          <span className="festparaa ">
                            {startTime} - {endTime}
                          </span>
                        </div>
                      )}

                      {/* LOCATION */}
                      {venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className={`h-4 w-4 ${categoryStyle.text}`} strokeWidth={2.5} />

                          <span className="festparaa">{venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* BUTTON */}
                  <div className="mt-2 pt-3 ">
                    <div
                      className={`flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity text-[#007A87] festviewwdetails`}
                    >
                      <Link href={`/events/${slug}`}>View Details</Link>
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </motion.div>
            )
          })}
        </div>

        {/* ======================================================
            VIEW ALL
        ====================================================== */}

        {/* {showViewAll && (
          <div className="mt-5 flex justify-center">
            <Link
              href={viewAllLink}
              className="rounded-full bg-[#005B70] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105"
            >
              View All Events
            </Link>
          </div>
        )} */}
      </div>
    </section>
  )
}
// 'use client'

// import React, { useEffect, useMemo, useState } from 'react'

// import axios from 'axios'
// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion'

// type Props = {
//   heading?: string
//   description?: string
//   showViewAll?: boolean
//   viewAllLink?: string
// }

// export default function EventListingComponent({
//   heading,
//   description,
//   showViewAll = true,
//   viewAllLink = '/summer',
// }: Props) {
//   const [events, setEvents] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   const [activeWeek, setActiveWeek] = useState<string>('all')

//   /* ======================================================
//      FETCH EVENTS
//   ====================================================== */

//   useEffect(() => {
//     fetchEvents()
//   }, [])

//   const fetchEvents = async () => {
//     try {
//       setLoading(true)

//       const res = await axios.get('/api/summer-events-lisings')

//       setEvents(res.data.docs || [])
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   /* ======================================================
//      WEEK TABS
//   ====================================================== */

//   const weeks = useMemo(() => {
//     const allWeeks = events?.map((event) => event?.eventFields?.week) || []

//     const uniqueWeeks = allWeeks.filter(
//       (week, index, self) => week && index === self.findIndex((w) => w?.id === week?.id),
//     )

//     return uniqueWeeks
//   }, [events])

//   /* ======================================================
//      FILTERED EVENTS
//   ====================================================== */

//   const filteredEvents =
//     activeWeek === 'all'
//       ? events
//       : events.filter((event) => String(event?.eventFields?.week?.id) === activeWeek)

//   /* ======================================================
//      LOADING
//   ====================================================== */

//   if (loading) {
//     return <div className="py-24 text-center text-xl font-bold">Loading Events...</div>
//   }

//   if (!events?.length) return null

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white py-24">
//       {/* BG */}
//       <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-200/20 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-4 md:px-8">
//         {/* HEADER */}
//         <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
//           <div className="max-w-3xl">
//             <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
//               {heading}
//             </h2>

//             {description && <p className="mt-5 text-lg leading-8 text-gray-600">{description}</p>}
//           </div>

//           {showViewAll && (
//             <Link
//               href={viewAllLink}
//               className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white px-6 py-3 font-bold text-orange-600 transition-all hover:bg-orange-500 hover:text-white"
//             >
//               View All
//             </Link>
//           )}
//         </div>

//         {/* WEEK TABS */}
//         <div className="mb-14 flex flex-wrap gap-4">
//           <button
//             onClick={() => setActiveWeek('all')}
//             className={`rounded-full px-6 py-3 font-bold transition-all ${
//               activeWeek === 'all' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
//             }`}
//           >
//             All Events
//           </button>

//           {weeks.map((week: any) => (
//             <button
//               key={week?.id}
//               onClick={() => setActiveWeek(String(week?.id))}
//               className={`rounded-full px-6 py-3 font-bold transition-all ${
//                 activeWeek === String(week?.id)
//                   ? 'bg-orange-500 text-white'
//                   : 'bg-orange-100 text-orange-600'
//               }`}
//             >
//               {week?.title}
//             </button>
//           ))}
//         </div>

//         {/* EVENTS GRID */}
//         <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
//           {filteredEvents.map((event: any, index) => {
//             const eventData = event?.eventFields || {}

//             const image =
//               eventData?.featuredImage?.sizes?.large?.url ||
//               eventData?.featuredImage?.url ||
//               '/placeholder.jpg'

//             const title = eventData?.title || event?.title

//             const shortDescription = eventData?.shortDescription

//             const venue = eventData?.venue?.title

//             const category = eventData?.eventType?.title

//             const startTime = eventData?.startTime

//             const endTime = eventData?.endTime

//             const slug = event?.slug

//             const eventDate = eventData?.eventDates?.[0]?.date

//             const formattedDate = eventDate
//               ? new Date(eventDate).toLocaleDateString('en-IN', {
//                   day: 'numeric',
//                   month: 'long',
//                   year: 'numeric',
//                 })
//               : ''

//             return (
//               <motion.div
//                 key={event?.id}
//                 initial={{
//                   opacity: 0,
//                   y: 40,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.1,
//                 }}
//               >
//                 <Link
//                   href={`/events/${slug}`}
//                   className="group block overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(249,115,22,0.16)]"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative h-[280px] overflow-hidden">
//                     <Image
//                       src={image}
//                       alt={title}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//                     {/* CATEGORY */}
//                     {category && (
//                       <div className="absolute left-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-white">
//                         {category}
//                       </div>
//                     )}

//                     {/* DATE */}
//                     {formattedDate && (
//                       <div className="absolute bottom-5 left-5 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md">
//                         <p className="text-xs uppercase tracking-[2px] text-orange-200">
//                           Event Date
//                         </p>

//                         <h4 className="mt-1 text-sm font-bold text-white">{formattedDate}</h4>
//                       </div>
//                     )}
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-7">
//                     {/* VENUE */}
//                     {venue && (
//                       <p className="mb-3 text-sm font-semibold uppercase tracking-[2px] text-orange-500">
//                         📍 {venue}
//                       </p>
//                     )}

//                     {/* TITLE */}
//                     <h3 className="text-2xl font-black leading-tight text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
//                       {title}
//                     </h3>

//                     {/* DESCRIPTION */}
//                     {shortDescription && (
//                       <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
//                         {shortDescription}
//                       </p>
//                     )}

//                     {/* TIME */}
//                     {(startTime || endTime) && (
//                       <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-500">
//                         🕒 {startTime} - {endTime}
//                       </div>
//                     )}

//                     {/* BUTTON */}
//                     <div className="mt-8 flex items-center gap-3 font-bold text-orange-600">
//                       Explore Event
//                       <span className="transition-transform duration-300 group-hover:translate-x-2">
//                         →
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }
