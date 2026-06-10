'use client'

import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

export type SummerCardData = {
  slug?: string
  title?: string
  heroImage?: any
  mobileImage?: any

  eventFields?: {
    title?: string
    shortDescription?: string

    eventDates?: {
      date?: string
    }[]

    startTime?: string
    endTime?: string

    featuredImage?: any
  }
}

export const SummerCard: React.FC<{
  doc: SummerCardData
}> = ({ doc }) => {
  const { slug, title, heroImage, mobileImage, eventFields } = doc || {}

  /* ======================================================
     IMAGE
  ====================================================== */

  const imageToUse = eventFields?.featuredImage || heroImage || mobileImage

  /* ======================================================
     DATE
  ====================================================== */

  const eventDate = eventFields?.eventDates?.[0]?.date

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  /* ======================================================
     TIME
  ====================================================== */

  const eventTime =
    eventFields?.startTime && eventFields?.endTime
      ? `${eventFields.startTime} - ${eventFields.endTime}`
      : null

  /* ======================================================
     URL
  ====================================================== */

  const href = `/events/${slug}`

  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full overflow-hidden  border border-white/10 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_100px_rgba(0,0,0,0.16)]">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.05] via-transparent to-violet-500/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="">
            {imageToUse ? (
              <Media
                resource={imageToUse}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100">
                <span className="text-slate-400">No Image</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 z-20 w-full p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {formattedDate && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formattedDate}
                </div>
              )}

              {eventTime && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                  <Clock3 className="h-3.5 w-3.5" />
                  {eventTime}
                </div>
              )}
            </div>

            <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white capitalize transition-all duration-300 group-hover:translate-x-1">
              {eventFields?.title || title}
            </h3>
          </div>
        </div>

        <div className="relative p-6">
          {eventFields?.shortDescription && (
            <p className="text-xs text-[#000] line-clamp-2 mb-3 leading-relaxed font-medium  festparaa !text-[16px]">
              {eventFields.shortDescription}
            </p>
          )}

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="flex items-center justify-between">
            
            <p className="flex items-center gap-1.5 text-lg font-bold tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity text-[#007A87] festviewwdetails">
              View Details
            </p>

            {/* Arrow Button */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Hover Border */}
        <div className="pointer-events-none absolute inset-0  border border-transparent transition-all duration-500 group-hover:border-pink-500/20" />
      </article>
    </Link>
  )
}
