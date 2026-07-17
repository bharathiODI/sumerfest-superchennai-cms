'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Partner = {
  name: string
  logo: {
    url: string
    alt?: string
  }
  link?: string
}

type Props = {
  title?: string
  subtitle?: string
  partners: Partner[]
}

export const PartnerCarousel: React.FC<Props> = ({ title, subtitle, partners = [] }) => {
  if (!partners?.length) return null

  const duplicatedPartners = [...partners, ...partners]
  const WaveDecoration = () => (
    <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
      ~~~
    </span>
  )

  return (
    <div className="ourpartnerssssection bg-[#f5f5f5]">
      <section className="relative overflow-hidden py-20">
        <div className="container max-w-7xl mx-auto px-4">
          {/* BG */}
          <div className="absolute inset-0 " />

          <div className="relative container mx-auto max-w-7xl px-4 mt-10">
            {/* HEADER */}
            {(title || subtitle) && (
              <div className="mx-auto mb-13 max-w-3xl text-center">
                <div className="mb-10 text-center">
                  <h3 className="text-sm font-extrabold tracking-widest text-[#005b70] flex items-center justify-center uppercase festmainheadingsss">
                    <WaveDecoration />
                    {title}
                    <WaveDecoration />
                  </h3>
                </div>
                {subtitle && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="mt-5 text-lg leading-8 text-gray-600"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>
            )}

            {/* SIDE FADE */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 " />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 " />

            {/* MARQUEE */}
            <div className="relative overflow-hidden">
              <motion.div
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 24,
                  ease: 'linear',
                }}
                className="flex w-max gap-8 paddingcarsouel"
              >
                {duplicatedPartners.map((partner, index) => {
                  const Wrapper = partner.link ? Link : 'div'

                  return (
                    <Wrapper
                      key={`${partner.name}-${index}`}
                      href={partner.link || '#'}
                      target={partner.link ? '_blank' : undefined}
                      className="group relative flex h-[160px] w-[240px] flex-shrink-0 items-center justify-center overflow-hidden  border border-gray-100 bg-white/90 p-8 rounded-[5px] transition-all duration-500   hovereddbossss"
                    >
                      {/* HOVER BG */}
                      {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 to-orange-200/0 opacity-0 transition-all duration-500 " /> */}

                      {/* LOGO */}
                      <div className="relative z-10 flex items-center justify-center">
                        <Image
                          src={partner.logo.url}
                          alt={partner.logo.alt || partner.name}
                          width={180}
                          height={100}
                          className="max-h-[100%] w-auto object-contain  transition-all duration-500  mt-0 mb-0 "
                        />
                      </div>

                      {/* NAME */}
                      {/* <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-10 text-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-bold tracking-wide text-white">{partner.name}</p>
                  </div> */}
                    </Wrapper>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Our Partners
