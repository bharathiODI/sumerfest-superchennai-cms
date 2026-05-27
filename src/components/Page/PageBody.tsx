'use client'

import React from 'react'
import LexicalRenderer from '../lexical/LexicalRenderer'

interface PageBodyProps {
  content: any
}

const PageBody: React.FC<PageBodyProps> = ({ content }) => {
  if (!content) return null

  return (
    <section className="">
      <div className="">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-a:text-pink-600 prose-img:rounded-2xl">
          <LexicalRenderer content={content} />
        </div>
      </div>
    </section>
  )
}

export default PageBody
