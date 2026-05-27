import React from 'react'
import { ArattaiCard } from './ArattaiCard'

export const ArattaiArchive = ({ events }: { events: any[] }) => {
  if (!events?.length) return null

  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <ArattaiCard key={i} doc={event} />
        ))}
      </div>
    </section>
  )
}