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

export const PartnerCarousel: React.FC<Props> = ({
  title,
  subtitle,
  partners = [],
}) => {
  if (!partners?.length) return null

  const duplicatedPartners = [
    ...partners,
    ...partners,
  ]

  return (
    <section className="relative overflow-hidden py-20">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/40" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        {(title || subtitle) && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            {title && (
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="text-4xl font-black tracking-tight text-gray-900 md:text-6xl"
              >
                {title}
              </motion.h2>
            )}

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
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white via-white/70 to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white via-white/70 to-transparent" />

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
            className="flex w-max gap-8"
          >
            {duplicatedPartners.map(
              (partner, index) => {
                const Wrapper =
                  partner.link
                    ? Link
                    : 'div'

                return (
                  <Wrapper
                    key={`${partner.name}-${index}`}
                    href={
                      partner.link ||
                      '#'
                    }
                    target={
                      partner.link
                        ? '_blank'
                        : undefined
                    }
                    className="group relative flex h-[160px] w-[240px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[30px] border border-gray-100 bg-white/90 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]"
                  >
                    {/* HOVER BG */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 to-orange-200/0 opacity-0 transition-all duration-500 group-hover:from-orange-100/40 group-hover:to-orange-200/20 group-hover:opacity-100" />

                    {/* LOGO */}
                    <div className="relative z-10 flex items-center justify-center">
                      <Image
                        src={
                          partner.logo
                            .url
                        }
                        alt={
                          partner.logo
                            .alt ||
                          partner.name
                        }
                        width={180}
                        height={100}
                        className="max-h-[90px] w-auto object-contain grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      />
                    </div>

                    {/* NAME */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-10 text-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-bold tracking-wide text-white">
                        {partner.name}
                      </p>
                    </div>
                  </Wrapper>
                )
              },
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}