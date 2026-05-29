import { ArattaiArchive } from '@/components/Summer/ArattaiArchive'
import configPromise from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import AccodomationBanner from '../../../assets/images/withoutformherobanner.png'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const eventsRes = await payload.find({
    collection: 'summer-events',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className=" pb-24">
      <PageClient />
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]">
          <Image
            src={AccodomationBanner}
            alt="Events Banner"
            fill
            priority
            className="object-cover scale-105"
          />

          {/* Dark Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#052e16]/90 via-[#14532d]/70 to-[#3f6212]/50" />

          {/* Green + Orange Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.30),transparent_40%)]" />

          {/* Extra Overlay Texture */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 mt-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xl shadow-lg">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-pulse" />
                Summer Festival 2026
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                Discover
                <span className="bg-gradient-to-r from-orange-300 via-yellow-200 to-green-300 bg-clip-text text-transparent">
                  {' '}
                  Amazing SummerFest
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Explore immersive experiences, live performances, music nights, cultural
                celebrations, workshops and unforgettable moments happening across the city.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {/* Primary Button */}
                {/* <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-green-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(249,115,22,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_50px_rgba(34,197,94,0.35)]"
                >
                  Explore Events
                </Link> */}

                {/* Secondary Button */}
                {/* <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                >
                  Contact Us
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container mx-auto mt-10">
        <ArattaiArchive events={eventsRes.docs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Trending Chennai Events | Super Chennai',
  }
}
