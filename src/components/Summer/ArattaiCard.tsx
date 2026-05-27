'use client'

import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

export type ArattaiCardData = {
  slug?: string
  title?: string
  heroImage?: any
  mobileImage?: any
  event?: {
    title?: string
    description?: string
    image?: any
    eventDates?: {
      date?: string
    }[]
    details?: {
      eventTime?: string
    }
  }
}

export const ArattaiCard: React.FC<{ doc: ArattaiCardData }> = ({ doc }) => {
  const { slug, title, heroImage, mobileImage, event } = doc || {}

  const firstEvent = event
  const imageToUse = firstEvent?.image || mobileImage

  const eventDate = firstEvent?.eventDates?.[0]?.date

  // Format date nicely (e.g., "Oct 24, 2023")
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const href = `/arattai/${slug}`

  return (
    <Link href={href} className="group block w-full max-w-sm">
      <article className="h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 ease-out transform hover:-translate-y-1">
        {/* Image Wrapper */}
        <div className="relative w-full h-[200px] md:h-[220px] lg:h-[440px] overflow-hidden bg-slate-100">
          {imageToUse ? (
            <Media
              resource={imageToUse}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-300">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-grow p-5">
          {/* Meta: Date & Time Tags */}
          {(formattedDate || firstEvent?.details?.eventTime) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md uppercase tracking-wide">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formattedDate}
                </span>
              )}
              {firstEvent?.details?.eventTime && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {firstEvent.details.eventTime}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          {firstEvent?.description && (
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
              {firstEvent.description}
            </p>
          )}

          {/* Footer / CTA */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-indigo-600 font-semibold text-sm">
            <span>View Event Details</span>
            <svg
              className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
