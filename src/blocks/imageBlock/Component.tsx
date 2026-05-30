// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// type Props = {
//   image?: any
//   mobileImage?: any
//   title?: string
//   description?: string
//   buttonText?: string
//   buttonLink?: string
//   imageHeight?: 'small' | 'medium' | 'large'
//   imageLink?: string
// }

// export default function ImageBlockComponent({
//   image,
//   mobileImage,
//   title,
//   description,
//   buttonText,
//   buttonLink,
//   imageHeight = 'medium',
//   imageLink,
// }: Props) {
//   const desktopImage = image?.sizes?.large?.url || image?.url || '/placeholder.jpg'

//   const mobileImageUrl = mobileImage?.sizes?.medium?.url || mobileImage?.url || desktopImage

//   const heightClass = {
//     small: 'h-[300px]',
//     medium: 'h-[700px]',
//     large: 'h-[700px]',
//   }

//   const ImageContent = (
//     <div className={`relative w-full overflow-hidden ${heightClass[imageHeight]}`}>
//       {/* DESKTOP IMAGE */}
//       <Image
//         src={desktopImage}
//         alt={title || 'Image'}
//         fill
//         priority
//         className="hidden  md:block"
//       />

//       {/* MOBILE IMAGE */}
//       <Image
//         src={mobileImageUrl}
//         alt={title || 'Mobile Image'}
//         fill
//         priority
//         className="object-cover md:hidden"
//       />

//       {/* CONTENT */}
//       <div className="absolute inset-0 flex items-center justify-center text-center">
//         <div className="max-w-5xl px-4">
//           {title && <h2 className="text-3xl font-black text-white md:text-6xl">{title}</h2>}

//           {description && <p className="mt-4 text-sm text-white md:text-lg">{description}</p>}

//           {buttonText && buttonLink && (
//             <div className="mt-6">
//               <Link
//                 href={buttonLink}
//                 className="inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-600"
//               >
//                 {buttonText}
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <section>
//       {imageLink ? (
//         <Link href={imageLink} className="block">
//           {ImageContent}
//         </Link>
//       ) : (
//         ImageContent
//       )}
//     </section>
//   )
// }

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
  imageLink?: string
}

export default function ImageBlockComponent({
  image,
  mobileImage,
  title,
  description,
  buttonText,
  buttonLink,
  imageLink,
}: Props) {
  const desktopImage = image?.sizes?.large?.url || image?.url || '/placeholder.jpg'

  const mobileImageUrl = mobileImage?.sizes?.medium?.url || mobileImage?.url || desktopImage

  const ImageContent = (
    <div className="relative w-full overflow-hidden">
      {/* DESKTOP IMAGE */}
      <Image
        src={desktopImage}
        alt={title || 'Image'}
        width={1920}
        height={1080}
        priority
        className="hidden md:block w-full h-auto object-contain"
      />

      {/* MOBILE IMAGE */}
      <Image
        src={mobileImageUrl}
        alt={title || 'Mobile Image'}
        width={800}
        height={1200}
        priority
        className="block md:hidden w-full h-auto object-contain"
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

      <section className="bg-[#FAF8F5] min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16 font-sans">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 relative">
            {/* Decorative Dot Matrix - Hidden on Mobile for clean look */}
            <div className="hidden sm:grid grid-cols-3 gap-2 w-12 opacity-40 absolute -top-10 left-0">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-2 h-2 bg-[#004B87] rounded-full"></span>
              ))}
            </div>

            {/* Heading Section */}
            <div className="space-y-1 sm:pt-4">
              <span className="text-[#004B87] uppercase tracking-wider font-bold text-sm sm:text-base">
                ABOUT
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-[#D9231D]">
                SUPER CHENNAI
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-[#004B87]">
                SUMMER FEST <span className="text-[#E28C27]">2026</span>
              </h2>
            </div>

            {/* Core Tagline with Left Border */}
            <div className="border-l-4 border-[#D9231D] pl-4">
              <p className="text-[#004B87] text-lg sm:text-xl font-extrabold leading-snug">
                Summer in Chennai is not just a season.
                <br />
                It is an identity.
              </p>
            </div>

            {/* Description Paragraphs */}
            <div className="text-gray-700 space-y-4 text-sm sm:text-base font-medium leading-relaxed">
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium  festparaa !text-[16px]">
                While most cities escape summer, Chennai embraces it. From beach sunsets and
                late-night food runs to music, culture, and city-wide energy, summer is when Chennai
                comes alive.
              </p>
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium  festparaa !text-[16px]">
                <strong className="text-[#D9231D] font-bold">Super Chennai Summer Fest 2026</strong>{' '}
                is a month-long celebration that transforms the city’s hottest season into its most
                happening.
              </p>
              <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium  festparaa !text-[16px]">
                Across June, Chennai’s beaches, streets, rooftops, and cultural spaces come alive
                with music, cinema, food, walks, and shared experiences.
              </p>
            </div>

            {/* Footer Branding Statement */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 lg:border-t-0">
              {/* Logo/Icon Placeholder */}
              <div className="flex-shrink-0 w-14 h-14 bg-[#004B87] rounded-full flex items-center justify-center text-white p-2 shadow-md">
                {/* Simple building/temple SVG icon to replicate the look */}
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h3s1-5 7-5 7 5 7 5h3L12 2zm0 4l5 10H7l5-10z" />
                </svg>
              </div>
              <div>
                <p className="text-[#004B87] font-extrabold text-sm sm:text-base">
                  Because Chennai doesn't escape summer.
                </p>
                <p className="text-[#D9231D] font-black text-base sm:text-lg">
                  Chennai celebrates it.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80"
              alt="Marina Beach Chennai Sunset"
              className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100"
            />
          </div>
        </div>
      </section>
    </section>
  )
}
