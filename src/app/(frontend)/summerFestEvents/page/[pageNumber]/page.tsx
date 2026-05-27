import type { Metadata } from 'next/types'

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
// import Banner from 'src/blocks/InnerPage/SharedBlocks/Banners/Components'
import { Pagination } from 'src/components/Pagination'
import configPromise from 'src/payload.config'
import PageClient from './page.client'
import { Suspense } from 'react'
import ArattaiDetails from '@/components/Summer/SummerDetails'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const sanitizedPageNumber = Number(pageNumber)
  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const arattai = await payload.find({
    collection: 'summer-events',
    depth: 3,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>summerFestEvents</h1>
        </div>
      </div>

      {/* <Suspense fallback={null}>
        <Banner />
      </Suspense> */}

      <ArattaiDetails data={arattai} />

      <div className="container">
        {arattai?.page && arattai?.totalPages > 1 && (
          <Pagination page={arattai.page} totalPages={arattai.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Super Chennai events Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'summer-events',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
