/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Media } from '@/components/Media'
import { motion } from 'framer-motion'

type Props = {
  sectionLabel?: string
  headingRed?: string
  headingBlue?: string
  description?: string
  viewMoreText?: string
  tabs?: any[]
  backgroundImage?: any
  backgroundOverlay?: boolean
  overlayOpacity?: number
}

export const GalleryVisualDiaryBlockComponent: React.FC<Props> = ({
  sectionLabel,
  headingRed,
  headingBlue,
  description,
  viewMoreText,
  backgroundImage,
  backgroundOverlay = false,
  overlayOpacity = 30,
  tabs = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  const activeTab = tabs?.[activeIndex]

  const images = useMemo(() => {
    return activeTab?.images || []
  }, [activeTab])

  useEffect(() => {
    if (images.length <= 5) return

    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [images])

  const visibleImages = useMemo(() => {
    if (!images?.length) return []

    return Array.from({ length: 5 }, (_, i) => {
      return images[(slideIndex + i) % images.length]
    })
  }, [images, slideIndex])

  const previous = () => {
    if (!images?.length) return

    setSlideIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    if (!images?.length) return

    setSlideIndex((prev) => (prev + 1) % images.length)
  }

  const changeTab = (index: number) => {
    setActiveIndex(index)
    setSlideIndex(0)
  }

  if (!tabs?.length) return null

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      {backgroundImage?.url && (
        <>
          <img
            src={backgroundImage.url}
            alt="Gallery Background"
            className="absolute inset-0 w-full h-full"
          />

          {backgroundOverlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{
                opacity: overlayOpacity / 100,
              }}
            />
          )}
        </>
      )}

      {/* Default Background */}
      {!backgroundImage?.url && <div className="absolute inset-0 bg-[#FAF8F5]" />}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="uppercase text-[#004B87] font-bold tracking-wider text-sm">
              {sectionLabel}
            </span>

            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#D9231D]">{headingRed}</h2>

            <h3 className="text-4xl md:text-5xl font-black text-[#004B87]">{headingBlue}</h3>

            {description && (
              <p className="mt-4 text-gray-600 max-w-md mx-auto festparaa">{description}</p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab: any, index: number) => (
              <button
                key={index}
                onClick={() => changeTab(index)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium text-sm ${
                  activeIndex === index
                    ? 'bg-[#004B87] text-white border-[#004B87]'
                    : 'bg-white text-[#004B87] border-[#004B87]/30 hover:border-[#004B87]'
                }`}
              >
                {tab.title}
              </button>
            ))}

            {/* {viewMoreText && (
            <button className="px-8 py-3 rounded-full border border-[#004B87] text-[#004B87] font-semibold hover:bg-[#004B87] hover:text-white transition">
              {viewMoreText} →
            </button>
          )} */}
          </div>

          {/* Gallery */}
          {visibleImages.length >= 5 && (
            <motion.div
              layout
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
              className="relative h-[500px] flex items-center justify-center"
            >
              {/* Left */}
              <motion.div
                key={`left-${slideIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 md:left-12 top-24 w-[260px] h-[320px] rounded-3xl overflow-hidden shadow-xl hidden md:block"
              >
                <Media
                  resource={visibleImages?.[0]?.image}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Left Center */}
              <motion.div
                key={`left-center-${slideIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-[10%] md:left-[18%] z-10 w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Media
                  resource={visibleImages?.[1]?.image}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Center */}
              <motion.div
                key={`center-${slideIndex}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-30 w-[340px] md:w-[420px] h-[450px] rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,75,135,0.25)]"
              >
                <Media
                  resource={visibleImages?.[2]?.image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6"></div>
              </motion.div>

              {/* Right Center */}
              <motion.div
                key={`right-center-${slideIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute right-[10%] md:right-[18%] z-10 w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Media
                  resource={visibleImages?.[3]?.image}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right */}
              <motion.div
                key={`right-${slideIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 md:right-12 top-24 w-[260px] h-[320px] rounded-3xl overflow-hidden shadow-xl hidden md:block"
              >
                <Media
                  resource={visibleImages?.[4]?.image}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={previous}
              className="w-12 h-12 rounded-full border-2 border-[#004B87] flex items-center justify-center text-[#004B87] hover:bg-[#004B87] hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-[#004B87] flex items-center justify-center text-[#004B87] hover:bg-[#004B87] hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
