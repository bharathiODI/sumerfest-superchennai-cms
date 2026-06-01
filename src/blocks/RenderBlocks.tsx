// import React, { Fragment } from 'react'
// import { FormBlock } from 'src/blocks/Form/Component'
// import { MediaBlock } from 'src/blocks/MediaBlock/Component'
// import type { Page } from 'src/payload-types'
// import HeroSliderBlock from './PageBanners/Home/Component'
// import { CTABlockComponent } from './cta/Component'
// import { GalleryBlockComponent } from './gallery/Component'
// import { PartnerLogosComponent } from './partnerLogos/Component'
// import { PerformerShowcaseComponent } from './performerShowcase/Component'
// import { StatsBlockComponent } from './stats/Component'
// import { WeekTimelineComponent } from './weekTimeline/Component'
// import ImageBlockComponent from './imageBlock/Component'
// import AboutEventBlockComponent from './AboutEvent/Component'

// const blockComponents: {
//   [key: string]: React.FC<any>
// } = {
//   formBlock: FormBlock,
//   mediaBlock: MediaBlock,
//   weekTimeline: WeekTimelineComponent,
//   performerShowcase: PerformerShowcaseComponent,
//   partnerLogos: PartnerLogosComponent,
//   statsBlock: StatsBlockComponent,
//   galleryBlock: GalleryBlockComponent,
//   ctaBlock: CTABlockComponent,
//   heroSliderBlock: HeroSliderBlock,
//   ImageBlock: ImageBlockComponent,
//   AboutEventBlock: AboutEventBlockComponent,
// }

// export const RenderBlocks: React.FC<{
//   blocks: Page['content'][0][]

// }> = (props) => {
//   const { blocks } = props

//   const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

//   if (hasBlocks) {
//     return (
//       <Fragment>
//         {blocks.map((block, index) => {
//           const { blockType } = block

//           if (blockType && blockType in blockComponents) {
//             const Block = blockComponents[blockType]

//             if (Block) {
//               return (
//                 <div key={index}>
//                   <Block {...block} disableInnerContainer={true} />
//                 </div>
//               )
//             }
//           }
//           return null
//         })}
//       </Fragment>
//     )
//   }

//   return null
// }

import React, { Fragment } from 'react'
import type { Page } from 'src/payload-types'

// Blocks
import { FormBlock } from 'src/blocks/Form/Component'
import { MediaBlock } from 'src/blocks/MediaBlock/Component'
import HeroSliderBlock from './PageBanners/Home/Component'
import { CTABlockComponent } from './cta/Component'
import { GalleryBlockComponent } from './gallery/Component'
import { PartnerLogosComponent } from './partnerLogos/Component'
import { PerformerShowcaseComponent } from './performerShowcase/Component'
import { StatsBlockComponent } from './stats/Component'
import { WeekTimelineComponent } from './weekTimeline/Component'
import ImageBlockComponent from './imageBlock/Component'
import AboutEventBlockComponent from './AboutEvent/Component'
import EventRegistrationBlockComponent from './EventRegistrationForm/coponents'
import { MediaCarouselBlock } from './MediaCarousel/Component'
import { AboutSummerFestBlockComponent } from './AboutSummerFestBlock/Component'
import FeaturedEventBlockComponent from './EventsDetails/Component'

/**
 * Map Payload blockType → React Component
 */
const blockComponents: Record<string, React.FC<any>> = {
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  weekTimeline: WeekTimelineComponent,
  performerShowcase: PerformerShowcaseComponent,
  partnerLogos: PartnerLogosComponent,
  statsBlock: StatsBlockComponent,
  galleryBlock: GalleryBlockComponent,
  ctaBlock: CTABlockComponent,
  heroSliderBlock: HeroSliderBlock,
  ImageBlock: ImageBlockComponent,
  AboutEventBlock: AboutEventBlockComponent,
  eventRegistrationFormBlock: EventRegistrationBlockComponent,
  mediaCarousel: MediaCarouselBlock,
  aboutSummerFestBlock: AboutSummerFestBlockComponent,
  eventDetailsBlock: FeaturedEventBlockComponent,
}

/**
 * Lexical RichText Block Renderer (Payload v3)
 */
export const RenderBlocks: React.FC<{
  blocks?: Page['content']
}> = ({ blocks }) => {
  if (!blocks) return null

  const children = (blocks as any)?.root?.children

  if (!Array.isArray(children)) return null

  return (
    <Fragment>
      {children.map((node: any, index: number) => {
        // Only block nodes
        if (node?.type !== 'block') return null

        const blockType = node?.fields?.blockType
        if (!blockType) return null

        const Block = blockComponents[blockType]
        if (!Block) return null

        return (
          <div key={index}>
            <Block {...node.fields} disableInnerContainer={true} />
          </div>
        )
      })}
    </Fragment>
  )
}
