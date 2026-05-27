// /* eslint-disable @next/next/no-img-element */

// import defaultImage from '../assets/images/default/default.png'
// import { getCachedGlobal } from '@/utilities/getGlobals'

// export default async function Footer() {
//   try {
//     const footer = (await getCachedGlobal('footer', 1)()) as any
//     const { logo, description, quickLinks = [], socialLinks = [], copyright } = footer || {}

//     return (
//       <footer className="w-full border-t border-gray-200 bg-black text-white">
//         <div className="mx-auto max-w-7xl px-6 py-14">
//           <div className="grid gap-10 md:grid-cols-3">
//             {/* LOGO + DESCRIPTION */}

//             <div>
//               <img
//                 src={logo?.url || defaultImage.src}
//                 alt={logo?.alt || 'Footer Logo'}
//                 className="mb-5 h-auto w-[160px] object-contain"
//               />

//               <p className="max-w-sm text-sm leading-7 text-gray-400">{description}</p>
//             </div>

//             {/* QUICK LINKS */}

//             <div>
//               <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

//               <ul className="space-y-3">
//                 {quickLinks.map((item: any, index: number) => (
//                   <li key={index}>
//                     <a
//                       href={item.link}
//                       className="text-sm text-gray-400 transition hover:text-white"
//                     >
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* SOCIAL LINKS */}

//             <div>
//               <h3 className="mb-5 text-lg font-semibold">Follow Us</h3>

//               <div className="flex flex-wrap gap-4">
//                 {socialLinks.map((item: any, index: number) => (
//                   <a
//                     key={index}
//                     href={item.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-gray-400 transition hover:text-white"
//                   >
//                     {item.platform}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* BOTTOM */}

//           <div className="mt-12 border-t border-gray-800 pt-6 text-center">
//             <p className="text-sm text-gray-500">{copyright || '© 2026 All Rights Reserved.'}</p>
//           </div>
//         </div>
//       </footer>
//     )
//   } catch (error) {
//     console.error('Footer Error:', error)

//     return <footer className="bg-black py-8 text-center text-white">Footer Failed</footer>
//   }
// }
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-yellow-400 text-black">
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* 3 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">

          {/* LEFT - SOCIAL ICONS */}
          <div className="flex items-center gap-5 justify-center md:justify-start">
            <a
              href="#"
              className="text-2xl hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="text-2xl hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="text-2xl hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* CENTER - COMPANY TEXT */}
          <div className="text-center">
            <p className="text-sm md:text-base font-medium">
              © 2026 Super Chennai Summer Fest. All Rights Reserved.
            </p>
          </div>

          {/* RIGHT - EMAIL */}
          <div className="text-center md:text-right">
            <a
              href="mailto:hello@superchennai.com"
              className="text-sm md:text-base font-medium hover:underline"
            >
              hello@superchennai.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}