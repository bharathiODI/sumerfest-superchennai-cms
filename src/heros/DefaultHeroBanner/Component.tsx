/* eslint-disable @next/next/no-img-element */
import React from 'react'
import defaultImage from '../../assets/images/AccodomationBannerr.jpg'

interface ImageObject {
  url: string
}

interface Props {
  image?: string | ImageObject | null
  heading?: string | null
}

export const DefaultHeroBanner: React.FC<Props> = ({ heading, image }) => {
  const imageUrl =
    typeof image === 'object' && image?.url
      ? image.url
      : typeof image === 'string'
        ? `/api/media/${image}`
        : ''

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center h-[300px] md:h-[420px] lg:h-[520px] overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl || defaultImage.src}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/40" /> */}

        {/* Heading */}
        <div className="relative z-10 text-center px-4">
          {/* <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {heading || 'Welcome'}
          </h3> */}
        </div>
      </div>
    </div>
  )
}
