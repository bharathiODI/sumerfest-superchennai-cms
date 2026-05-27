'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  image?: any
  mobileImage?: any
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageHeight?: 'small' | 'medium' | 'large'
  imageLink?: string
}

export default function ImageBlockComponent({
  image,
  mobileImage,
  title,
  description,
  buttonText,
  buttonLink,
  imageHeight = 'medium',
  imageLink,
}: Props) {
  const desktopImage = image?.sizes?.large?.url || image?.url || '/placeholder.jpg'

  const mobileImageUrl = mobileImage?.sizes?.medium?.url || mobileImage?.url || desktopImage

  const heightClass = {
    small: 'h-[300px]',
    medium: 'h-[700px]',
    large: 'h-[700px]',
  }

  const ImageContent = (
    <div className={`relative w-full overflow-hidden ${heightClass[imageHeight]}`}>
      {/* DESKTOP IMAGE */}
      <Image
        src={desktopImage}
        alt={title || 'Image'}
        fill
        priority
        className="hidden  md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src={mobileImageUrl}
        alt={title || 'Mobile Image'}
        fill
        priority
        className="object-cover md:hidden"
      />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-5xl px-4">
          {title && <h2 className="text-3xl font-black text-white md:text-6xl">{title}</h2>}

          {description && <p className="mt-4 text-sm text-white md:text-lg">{description}</p>}

          {buttonText && buttonLink && (
            <div className="mt-6">
              <Link
                href={buttonLink}
                className="inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-600"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section>
      {imageLink ? (
        <Link href={imageLink} className="block">
          {ImageContent}
        </Link>
      ) : (
        ImageContent
      )}
    </section>
  )
}
