'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  image?: any
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageHeight?: 'small' | 'medium' | 'large'
  imageLink?: string
}

export default function ImageBlockComponent({
  image,
  title,
  description,
  buttonText,
  buttonLink,
  imageHeight = 'medium',
  imageLink,
}: Props) {
  const imageUrl =
    image?.sizes?.large?.url ||
    image?.url ||
    '/placeholder.jpg'

  const heightClass = {
    small: 'h-[300px]',
    medium: 'h-[450px]',
    large: 'h-[650px]',
  }

  const ImageContent = (
    <div
      className={`relative w-full overflow-hidden ${heightClass[imageHeight]}`}
    >
      <Image
        src={imageUrl}
        alt={title || 'Image'}
        fill
        // sizes="100vw"
        className=""
      />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-10xl">
          {buttonText && buttonLink && (
            <div className="">
              <Link
                href={buttonLink}
                className=""
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