/* eslint-disable @next/next/no-img-element */

import React from 'react'

export const EventRegistrationComponent = ({
  registrationTitle,
  registrationDescription,
  registrationImage,
  registrationPoints,
  buttonText,
  buttonLink,
}: any) => {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#fff7ef]">
      <div className="max-w-10xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-5">
            Summer Fest Registration
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {registrationTitle}
          </h2>

          {registrationDescription && (
            <p className="text-lg text-gray-600 leading-8 mb-8">{registrationDescription}</p>
          )}

          {/* POINTS */}
          <div className="space-y-4 mb-10">
            {registrationPoints?.map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                  ✓
                </div>

                <p className="text-gray-700 text-lg leading-7">{item.point}</p>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          {buttonText && (
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="overflow-hidden rounded-[32px] shadow-2xl">
            <img
              src={registrationImage?.url}
              alt={registrationTitle}
              className="w-full h-[650px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
