import Link from 'next/link'
import React from 'react'

import { ArrowRight, Home, SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center px-6 py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <SearchX className="h-12 w-12 text-pink-400" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-[110px] md:text-[170px] leading-none font-black tracking-tight bg-gradient-to-r from-white via-pink-300 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">Lost in Chennai?</h2>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          The page you are looking for may have been moved, deleted, or never existed. Let’s guide
          you back to something amazing.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
          >
            Explore Events
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-14 text-sm text-white/40">
          Super Chennai • Experience Culture • Events • Community
        </p>
      </div>
    </section>
  )
}
