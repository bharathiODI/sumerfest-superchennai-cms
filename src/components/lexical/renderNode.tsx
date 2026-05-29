import { renderText } from './renderText'

import EventListingComponent from '@/blocks/eventListing/Component'
import { EventRegistrationComponent } from '@/blocks/eventRegistrationPoints/Components'
import { PartnerCarousel } from '@/blocks/Partners/Component'
import CodeBlock from './blocks/CodeBlock'
import ImageBlock from './blocks/ImageBlock'
import MediaBlock from './blocks/MediaBlock'
import VideoBlock from './blocks/VideoBlock'
import ImageBlockComponent from '@/blocks/imageBlock/Component'
import AboutEventBlockComponent from '@/blocks/AboutEvent/Component'

export function renderNode(node: any, idx: number): React.ReactNode {
  /* ------------------------------------------------
   DEBUG
  ------------------------------------------------ */
  console.log('LEXICAL NODE =>', node)

  switch (node.type) {
    /* ------------------------------------------------
     PARAGRAPH
    ------------------------------------------------ */
    case 'paragraph':
      return (
        <p key={idx} className="mb-0 text-lg leading-8 text-gray-700 paragaphhlexical">
          {renderText(node.children)}
        </p>
      )

    /* ------------------------------------------------
     HEADING
    ------------------------------------------------ */
    case 'heading': {
      const Tag = (node.tag || 'h2') as React.ElementType

      return (
        <Tag
          key={idx}
          className={` paragaphhlexical text-center blog-${node.tag || 'h2'} text-[#005b70] text-3xl font-bold tracking-wide  mt-0 mb-0`}
        >
          {renderText(node.children)}
        </Tag>
      )
    }

    /* ------------------------------------------------
     LIST
    ------------------------------------------------ */
    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'

      return (
        <ListTag
          key={idx}
          className={`pl-6 mb-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
        >
          {node.children?.map((child: any, i: number) => (
            <li key={i}>{renderText(child.children)}</li>
          ))}
        </ListTag>
      )
    }

    /* ------------------------------------------------
     IMAGE / UPLOAD
    ------------------------------------------------ */
    case 'upload':
      return <ImageBlock key={idx} node={node} />

    /* ------------------------------------------------
     BLOCKS
    ------------------------------------------------ */
    case 'block': {
      const blockType = node.fields?.blockType

      console.log('BLOCK TYPE =>', blockType)

      /* ---------------- CODE BLOCK ---------------- */
      if (blockType === 'code' || blockType === 'codeBlock') {
        return <CodeBlock key={idx} node={node} />
      }

      /* ---------------- VIDEO BLOCK ---------------- */
      if (blockType === 'video' || blockType === 'videoBlock') {
        return <VideoBlock key={idx} node={node} />
      }

      /* ---------------- MEDIA BLOCK ---------------- */
      if (blockType === 'media' || blockType === 'mediaBlock') {
        return <MediaBlock key={idx} node={node} />
      }

      if (blockType === 'eventListing') {
        return <EventListingComponent key={idx} {...node.fields} />
      }

      if (blockType === 'eventRegistration') {
        return <EventRegistrationComponent key={idx} {...node.fields} />
      }

      if (blockType === 'partnerCarouselBlock') {
        return <PartnerCarousel key={idx} {...node.fields} />
      }

      if (blockType === 'imageBlock') {
        return <ImageBlockComponent key={idx} {...node.fields} />
      }

      if (blockType === 'aboutEventBlock') {
        return <AboutEventBlockComponent key={idx} {...node.fields} />
      }

      return null
    }

    /* ------------------------------------------------
     DEFAULT
    ------------------------------------------------ */
    default:
      return null
  }
}
