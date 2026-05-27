/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const PerformerShowcaseComponent = ({
  heading,
  performers,
}: any) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">{heading}</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {performers?.map((performer: any) => (
            <div key={performer.id} className="text-center">
              <img
                src={performer?.image?.url}
                alt={performer.name}
                className="w-full h-80 object-cover rounded-3xl"
              />

              <h3 className="mt-4 text-xl font-semibold">
                {performer.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}