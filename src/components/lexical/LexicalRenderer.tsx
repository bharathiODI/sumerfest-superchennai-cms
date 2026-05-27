'use client'

import React from 'react'
import { renderNode } from './renderNode'

export default function LexicalRenderer({ content }: { content: any }) {
  if (!content?.root?.children) return null

  return (
    <div className="lexical-content">
      {content.root.children.map((node: any, idx: number) => (
        <React.Fragment key={idx}>{renderNode(node, idx)}</React.Fragment>
      ))}
    </div>
  )
}
