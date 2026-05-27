
'use client'

import React from 'react'
import {
  Award,
  MapPin,
  Music,
  Users,
  Utensils,
} from 'lucide-react'

type HighlightItem = {
  title?: string
  subtitle?: string
  icon?: string
  color?: string
}

type Props = {
  heading?: string
  highlightText?: string
  description?: string

  highlights?: HighlightItem[]

  locationTitle?: string
  locationAddress?: string
  mapLink?: string
}

export default function AboutEventBlockComponent({
  heading,
  highlightText,
  description,

  highlights = [],

  locationTitle,
  locationAddress,
  mapLink,
}: Props) {
  const iconMap: any = {
    utensils: Utensils,
    music: Music,
    users: Users,
    award: Award,
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="space-y-8">
          {/* HEADING */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-[#005B70]">
              {heading}{' '}
              <span className="text-[#E0533C]">
                {highlightText}
              </span>
            </h2>

            <div className="mt-2 h-1 w-12 rounded bg-[#FCBA13]" />
          </div>

          {/* DESCRIPTION */}
          {description && (
            <p className="festparaa !text-[16px] text-xs font-medium leading-relaxed text-[#000]">
              {description}
            </p>
          )}

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-2 gap-5 pt-2 md:grid-cols-4">
            {highlights?.map(
              (
                item,
                index,
              ) => {
                const Icon =
                  iconMap[
                    item?.icon ||
                      'award'
                  ] || Award

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className="mb-3 flex h-17 w-17 items-center justify-center rounded-full text-white shadow-sm"
                      style={{
                        backgroundColor:
                          item?.color ||
                          '#005B70',
                      }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="festparaa mt-0 mb-0 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                      {item?.title}
                    </span>

                    <span className="festparaa mt-[-2px] mb-3 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                      {item?.subtitle}
                    </span>
                  </div>
                )
              },
            )}
          </div>

          {/* LOCATION CARD */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#D9ECF0] bg-[#EDF6F7] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005B70] text-white shadow-sm">
              <MapPin className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h4 className="festparaa text-xs font-semibold uppercase tracking-wider text-[#005B70] !text-[16px]">
                {locationTitle}
              </h4>

              <p className="festparaa mb-3 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                {locationAddress}
              </p>

              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="festparaa inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-[#E0533C] transition-opacity hover:opacity-80 !text-[16px]"
                >
                  View on Google Maps{' '}
                  <span className="text-sm">
                    →
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}