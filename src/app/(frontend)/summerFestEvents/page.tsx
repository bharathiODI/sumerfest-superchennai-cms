import { ArattaiArchive } from '@/components/Summer/ArattaiArchive'
import configPromise from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import AccodomationBanner from '../../../assets/images/AccodomationBannerr.jpg'
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
      <section className="accaodomationBannerSection relative">
        <div className="relative w-full h-[400px]">
          <Image src={AccodomationBanner} alt="arattai" fill className="object-cover" priority />
        </div>

        <div className="accodoamationBannerContainer absolute inset-0 flex items-center">
          <div className="accodoamationBannerText container mx-auto">
            <h3>Arattai</h3>
            <div className="breadCrum">
              <Link href="/">Home</Link> - <Link href="/arattai">summerFestEvents</Link>
            </div>
          </div>
        </div>
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
