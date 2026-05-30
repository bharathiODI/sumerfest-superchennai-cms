/* eslint-disable @next/next/no-img-element */

import defaultImage from '../assets/images/default/default.png'
import { getCachedGlobal } from '@/utilities/getGlobals'

export default async function Footer() {
  try {
    const footer = (await getCachedGlobal('footer', 1)()) as any

    const { copyright, companyInfo, socialMedia } = footer || {}

    return (
      <footer className="w-full bg-yellow-400 text-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
          {/* =====================================================
              LEFT SIDE — SOCIAL MEDIA
          ===================================================== */}

          <div className="flex items-center gap-4 flexxxconatinerrr">
            {socialMedia?.map((item: any, index: number) => {
              const imageUrl =
                item?.icon?.url || item?.icon?.sizes?.thumbnail?.url || defaultImage.src

              return (
                <a
                  key={index}
                  href={item?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-black bg-white transition-all duration-300 hover:scale-105"
                  aria-label={item?.platform}
                >
                  <img src={imageUrl} alt={item?.platform} className="h-6 w-6 object-contain" />
                </a>
              )
            })}
          </div>

          {/* =====================================================
              CENTER — COPYRIGHT
          ===================================================== */}

          <div className="text-center">
            <p className="text-sm font-medium">{copyright || '© 2026 All Rights Reserved.'}</p>
          </div>

          {/* =====================================================
              RIGHT SIDE — COMPANY INFO
          ===================================================== */}

          <div className="text-center md:text-right">
            <a href={`mailto:${companyInfo?.supportEmail}`} className="text-sm underline">
              {companyInfo?.supportEmail}
            </a>
          </div>
        </div>
      </footer>
    )
  } catch (error) {
    console.error('Footer Error:', error)

    return <footer className="bg-black py-8 text-center text-white">Footer Failed</footer>
  }
}
