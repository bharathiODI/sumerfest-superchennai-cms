'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

type MediaType = {
  id?: string | number
  url?: string
  alt?: string
  filename?: string
}

type HighlightItem = {
  title?: string
  subtitle?: string

  /* TEXT ICON */
  iconText?: string

  /* SVG / IMAGE */
  iconImage?: MediaType | number | string | null

  /* BG COLOR */
  color?: string
}

type Props = {
  heading?: string
  highlightText?: string
  description?: string

  image?: MediaType | number | string | null

  highlights?: HighlightItem[]

  locationTitle?: string
  locationAddress?: string
  mapLink?: string
}

export default function AboutEventBlockComponent({
  heading,
  highlightText,
  description,
  image,
  highlights = [],
  locationTitle,
  locationAddress,
  mapLink,
}: Props) {
  /* ==============================
      MAIN IMAGE
  ============================== */

  const imageUrl = typeof image === 'object' && image !== null && 'url' in image ? image.url : null

  const imageAlt =
    typeof image === 'object' && image !== null && 'alt' in image ? image.alt : 'About Event'

  return (
    <section className="pb-[50px]">
      <div className="container max-w-7xl mx-auto px-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 space-y-8">
            {/* HEADING */}
            <div>
              <h2 className="text-2xl font-bold tracking-wide text-[#005B70] mt-0 mb-0">
                {heading} <span className="text-[#E0533C]">{highlightText}</span>
              </h2>

              <div className="mt-3 h-1 w-14 rounded bg-[#FCBA13]" />
            </div>

            {/* DESCRIPTION */}
            {description && (
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px]">
                {description}
              </p>
            )}

            {/* HIGHLIGHTS */}
            <div className="grid grid-cols-2 gap-5 pt-2 md:grid-cols-4">
              {highlights?.map((item, index) => {
                const iconImageUrl =
                  typeof item?.iconImage === 'object' &&
                  item?.iconImage !== null &&
                  'url' in item.iconImage
                    ? item.iconImage.url
                    : null

                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div
                      className="mb-3 flex h-17 w-17 items-center justify-center rounded-full text-white shadow-sm svgiconsoftheaboutt overflow-hidden"
                      style={{
                        backgroundColor: item?.color || '#005B70',
                      }}
                    >
                      {/* IMAGE / SVG */}
                      {iconImageUrl ? (
                        <Image
                          src={iconImageUrl}
                          alt={item?.title || 'icon'}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        /* TEXT ICON */
                        <span className="text-lg font-bold">{item?.iconText || 'A'}</span>
                      )}
                    </div>

                    <span className="festparaa mt-0 mb-0 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                      {item?.title}
                    </span>

                    <span className="festparaa mt-[-2px] mb-3 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                      {item?.subtitle}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* LOCATION CARD */}
            <div className="flex items-start gap-4 rounded-2xl border border-[#D9ECF0] bg-[#EDF6F7] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005B70] text-white shadow-sm">
                <MapPin className="h-7 w-7" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#005B70] tracking-wider uppercase festparaa !text-[16px] mt-0">
                  {locationTitle}
                </h4>

                <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px]">
                  {locationAddress}
                </p>

                {mapLink && (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E0533C] pt-1 hover:opacity-80 transition-opacity festparaa !text-[16px] underlinenone"
                  >
                    View on Google Maps
                    <span className="text-sm">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-7 space-y-8 withoutformseccc">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || 'About Event'}
                width={1200}
                height={900}
                className="h-full w-full object-cover mt-0 mb-0"
              />
            ) : (
              <div className="flex min-h-[450px] items-center justify-center rounded-[30px] bg-[#EDF6F7]">
                <div className="text-center">
                  <p className="mb-2 text-sm font-medium text-gray-500">No Image Added</p>

                  <p className="text-xs text-gray-400">Check console logs</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
