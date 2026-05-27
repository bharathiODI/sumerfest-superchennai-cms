// 'use client'

// import React from 'react'
// import Image from 'next/image'

// import { Award, MapPin, Music, Users, Utensils } from 'lucide-react'

// type HighlightItem = {
//   title?: string
//   subtitle?: string
//   icon?: string
//   color?: string
// }

// type MediaType = {
//   url?: string
//   alt?: string
// }

// type Props = {
//   heading?: string
//   highlightText?: string
//   description?: string

//   image?: MediaType

//   highlights?: HighlightItem[]

//   locationTitle?: string
//   locationAddress?: string
//   mapLink?: string
// }

// export default function AboutEventBlockComponent({
//   heading,
//   highlightText,
//   description,
//   image,
//   highlights = [],

//   locationTitle,
//   locationAddress,
//   mapLink,
// }: Props) {
//   const iconMap: any = {
//     utensils: Utensils,
//     music: Music,
//     users: Users,
//     award: Award,
//   }

//   return (
//     <section className="py-20">
//       <div className="container mx-auto max-w-7xl px-4">
//         <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
//           {/* LEFT CONTENT */}
//           <div className="space-y-8">
//             {/* HEADING */}
//             <div>
//               <h2 className="text-2xl font-bold tracking-wide text-[#005B70] md:text-4xl">
//                 {heading} <span className="text-[#E0533C]">{highlightText}</span>
//               </h2>

//               <div className="mt-3 h-1 w-14 rounded bg-[#FCBA13]" />
//             </div>

//             {/* DESCRIPTION */}
//             {description && (
//               <p className="festparaa text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
//                 {description}
//               </p>
//             )}

//             {/* HIGHLIGHTS */}
//             <div className="grid grid-cols-2 gap-5 pt-2 md:grid-cols-4">
//               {highlights?.map((item, index) => {
//                 const Icon = iconMap[item?.icon || 'award'] || Award

//                 return (
//                   <div key={index} className="flex flex-col items-center text-center">
//                     <div
//                       className="mb-3 flex h-17 w-17 items-center justify-center rounded-full text-white shadow-sm"
//                       style={{
//                         backgroundColor: item?.color || '#005B70',
//                       }}
//                     >
//                       <Icon className="h-7 w-7" />
//                     </div>

//                     <span className="festparaa mt-0 mb-0 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
//                       {item?.title}
//                     </span>

//                     <span className="festparaa mt-[-2px] mb-3 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
//                       {item?.subtitle}
//                     </span>
//                   </div>
//                 )
//               })}
//             </div>
//             {/* <div className="grid grid-cols-4 gap-2 pt-2">
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-17 h-17 rounded-full bg-[#E0533C] flex items-center justify-center text-white shadow-sm mb-3">
//                   <Utensils className="w-7 h-7" />
//                 </div>
//                 <span className="text-xs text-[#000] mb-0 leading-relaxed font-medium festparaa !text-[16px] mt-0">
//                   100+
//                 </span>
//                 <span className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px] mt-[-2px]">
//                   Food Stalls
//                 </span>
//               </div>

//               <div className="flex flex-col items-center text-center">
//                 <div className="w-17 h-17 rounded-full bg-[#007A87] flex items-center justify-center text-white shadow-sm mb-3">
//                   <Music className="w-7 h-7" />
//                 </div>
//                 <span className="text-xs text-[#000] mb-0 leading-relaxed font-medium festparaa !text-[16px] mt-0">
//                   50+
//                 </span>
//                 <span className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px] mt-[-2px]">
//                   Live Acts
//                 </span>
//               </div>

//               <div className="flex flex-col items-center text-center">
//                 <div className="w-17 h-17 rounded-full bg-[#E5A93C] flex items-center justify-center text-white shadow-sm mb-3">
//                   <Users className="w-7 h-7" />
//                 </div>
//                 <span className="text-xs text-[#000] mb-0 leading-relaxed font-medium festparaa !text-[16px] mt-0">
//                   Fun For
//                 </span>
//                 <span className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px] mt-[-2px]">
//                   Everyone
//                 </span>
//               </div>

//               <div className="flex flex-col items-center text-center">
//                 <div className="w-17 h-17 rounded-full bg-[#005B70] flex items-center justify-center text-white shadow-sm mb-3">
//                   <Award className="w-7 h-7" />
//                 </div>
//                 <span className="text-xs text-[#000] mb-0 leading-relaxed font-medium festparaa !text-[16px] mt-0">
//                   Weekend
//                 </span>
//                 <span className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px] mt-[-2px]">
//                   Experience
//                 </span>
//               </div>
//             </div> */}

//             {/* LOCATION CARD */}
//             <div className="flex items-start gap-4 rounded-2xl border border-[#D9ECF0] bg-[#EDF6F7] p-5">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005B70] text-white shadow-sm">
//                 <MapPin className="h-7 w-7" />
//               </div>

//               <div className="space-y-1.5">
//                 <h4 className="festparaa text-xs font-semibold uppercase tracking-wider text-[#005B70] !text-[16px]">
//                   {locationTitle}
//                 </h4>

//                 <p className="festparaa mb-3 text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
//                   {locationAddress}
//                 </p>

//                 {mapLink && (
//                   <a
//                     href={mapLink}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="festparaa inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-[#E0533C] transition-opacity hover:opacity-80 !text-[16px]"
//                   >
//                     View on Google Maps
//                     <span className="text-sm">→</span>
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div>
//             {image?.url ? (
//               <div className="overflow-hidden rounded-[30px] shadow-xl">
//                 <Image
//                   src={image.url}
//                   alt={image.alt || 'About Event'}
//                   width={1200}
//                   height={900}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             ) : (
//               <div className="flex min-h-[450px] items-center justify-center rounded-[30px] bg-[#EDF6F7]">
//                 <span className="text-sm text-gray-500">No Image Added</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import React from 'react'
import Image from 'next/image'

import { Award, MapPin, Music, Users, Utensils } from 'lucide-react'

type HighlightItem = {
  title?: string
  subtitle?: string
  icon?: string
  color?: string
}

type MediaType = {
  id?: string | number
  url?: string
  alt?: string
  filename?: string
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
  console.log('========== ABOUT EVENT BLOCK ==========')

  console.log('heading =>', heading)
  console.log('highlightText =>', highlightText)
  console.log('description =>', description)

  console.log('FULL IMAGE DATA =>', image)

  console.log('IMAGE JSON =>', JSON.stringify(image, null, 2))

  console.log('highlights =>', highlights)

  console.log('locationTitle =>', locationTitle)

  console.log('locationAddress =>', locationAddress)

  console.log('mapLink =>', mapLink)

  const iconMap: any = {
    utensils: Utensils,
    music: Music,
    users: Users,
    award: Award,
  }

  // SAFE IMAGE URL EXTRACTION
  const imageUrl = typeof image === 'object' && image !== null && 'url' in image ? image.url : null

  const imageAlt =
    typeof image === 'object' && image !== null && 'alt' in image ? image.alt : 'About Event'

  console.log('FINAL IMAGE URL =>', imageUrl)

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* HEADING */}
            <div>
              <h2 className="text-2xl font-bold tracking-wide text-[#005B70] md:text-4xl">
                {heading} <span className="text-[#E0533C]">{highlightText}</span>
              </h2>

              <div className="mt-3 h-1 w-14 rounded bg-[#FCBA13]" />
            </div>

            {/* DESCRIPTION */}
            {description && (
              <p className="festparaa text-xs font-medium leading-relaxed text-[#000] !text-[16px]">
                {description}
              </p>
            )}

            {/* HIGHLIGHTS */}
            <div className="grid grid-cols-2 gap-5 pt-2 md:grid-cols-4">
              {highlights?.map((item, index) => {
                const Icon = iconMap[item?.icon || 'award'] || Award

                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div
                      className="mb-3 flex h-17 w-17 items-center justify-center rounded-full text-white shadow-sm"
                      style={{
                        backgroundColor: item?.color || '#005B70',
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
              })}
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
                    View on Google Maps
                    <span className="text-sm">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            {imageUrl ? (
              <div className="overflow-hidden rounded-[30px] shadow-xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt || 'About Event'}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
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
