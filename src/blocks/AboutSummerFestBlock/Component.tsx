'use client'

import { Media } from '@/components/Media'
import React from 'react'

type Props = {
  aboutLabel?: string
  titleRed?: string
  titleBlue?: string
  year?: string
  tagline?: string
  description1?: string
  description2?: string
  description3?: string
  footerTitle?: string
  footerHighlight?: string
  image?: any
}

export const AboutSummerFestBlockComponent: React.FC<Props> = ({
  aboutLabel,
  titleRed,
  titleBlue,
  year,
  tagline,
  description1,
  description2,
  description3,
  footerTitle,
  footerHighlight,
  image,
}) => {
  return (
    <section className="bg-[#FAF8F5] min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 relative">
          {/* Decorative Dot Matrix */}
          <div className="hidden sm:grid grid-cols-3 gap-2 w-12 opacity-40 absolute -top-10 left-0">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-2 h-2 bg-[#004B87] rounded-full"></span>
            ))}
          </div>

          {/* Heading Section */}
          <div className="space-y-1 sm:pt-4">
            <span className="text-[#004B87] uppercase tracking-wider font-bold text-sm sm:text-base">
              {aboutLabel}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-[#D9231D]">
              {titleRed}
            </h1>
            <h1 className="hidden"> {titleBlue} </h1>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-[#004B87]">
              {titleBlue} <span className="text-[#E28C27]">{year}</span>
            </h2>
          </div>

          {/* Tagline */}
          <div className="border-l-4 border-[#D9231D] pl-4">
            <p className="text-[#004B87] text-lg sm:text-xl font-extrabold leading-snug">
              {tagline}
            </p>
          </div>

          {/* Description */}
          <div className="text-gray-700 space-y-4 text-sm sm:text-base font-medium leading-relaxed">
            {description1 && (
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px]">
                {description1}
              </p>
            )}

            {description2 && (
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px]">
                {description2}
              </p>
            )}

            {description3 && (
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px]">
                {description3}
              </p>
            )}
          </div>

          {/* Footer Branding */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 lg:border-t-0">
            <div className="flex-shrink-0 w-14 h-14 bg-[#004B87] rounded-full flex items-center justify-center text-white p-2 shadow-md">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h3s1-5 7-5 7 5 7 5h3L12 2zm0 4l5 10H7l5-10z" />
              </svg>
            </div>

            <div>
              <p className="text-[#004B87] font-extrabold text-sm sm:text-base">{footerTitle}</p>

              <p className="text-[#D9231D] font-black text-base sm:text-lg">{footerHighlight}</p>
            </div>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="lg:col-span-6 w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
          {image && (
            <Media
              resource={image}
              className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100"
            />
          )}
        </div>
      </div>
    </section>
  )
}
