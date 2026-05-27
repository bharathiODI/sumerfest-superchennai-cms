import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import { PayloadRedirects } from 'src/components/PayloadRedirects'
import configPromise from 'src/payload.config'

import SummerDetails from '@/components/Summer/SummerDetails'
import { LivePreviewListener } from 'src/components/LivePreviewListener'
import { generateMeta } from 'src/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const trendingChennai = await payload.find({
    collection: 'summer-events',
    draft: false,
    limit: 1000,
    depth: 5,
    overrideAccess: true,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = trendingChennai.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function ArrataiPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/summerFestEvents/' + slug
  const arattai = await queryPostBySlug({ slug })

  console.log('summerFestEvents', arattai)

  if (!arattai) return <PayloadRedirects url={url} />

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <div>
        <SummerDetails data={arattai} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const summerFestEvents = await queryPostBySlug({ slug })

  return generateMeta({ doc: summerFestEvents })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'summer-events',
    draft,
    limit: 1,
    depth: 5,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
