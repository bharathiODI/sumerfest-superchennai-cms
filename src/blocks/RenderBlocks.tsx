import React, { Fragment } from 'react'
import { FormBlock } from 'src/blocks/Form/Component'
import { MediaBlock } from 'src/blocks/MediaBlock/Component'
import type { Page } from 'src/payload-types'
import HeroSliderBlock from './PageBanners/Home/Component'
import { CTABlockComponent } from './cta/Component'
// import EventListingBlock from './eventListing/server'
import { GalleryBlockComponent } from './gallery/Component'
import { PartnerLogosComponent } from './partnerLogos/Component'
import { PerformerShowcaseComponent } from './performerShowcase/Component'
import { StatsBlockComponent } from './stats/Component'
import { WeekTimelineComponent } from './weekTimeline/Component'
import ImageBlockComponent from './imageBlock/Component'

const blockComponents: {
  [key: string]: React.FC<any>
} = {
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // eventListing: EventListingBlock,
  weekTimeline: WeekTimelineComponent,
  performerShowcase: PerformerShowcaseComponent,
  partnerLogos: PartnerLogosComponent,
  statsBlock: StatsBlockComponent,
  galleryBlock: GalleryBlockComponent,
  ctaBlock: CTABlockComponent,
  heroSliderBlock: HeroSliderBlock,
  // PartnerCarouselBlock:PartnerCarousel
  ImageBlock:ImageBlockComponent
  
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer={true} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
