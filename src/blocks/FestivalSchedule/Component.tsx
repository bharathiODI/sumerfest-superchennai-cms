/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import Slider from 'react-slick'
import { Media } from '@/components/Media'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import {
  ArrowRight,
  HelpCircle,
  Upload,
  ImageIcon,
  Award,
  Camera,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type Props = {
  sectionLabel?: string
  sectionTitle?: string
  contests?: any[]
}

export const FestivalScheduleBlockComponent: React.FC<Props> = ({
  sectionLabel,
  sectionTitle,
  contests,
}) => {
  const WaveDecoration = () => (
    <span className="inline-block mx-2 text-[#007A87] opacity-60 font-serif text-lg tracking-widest">
      ~~~
    </span>
  )

  const PrevArrow = ({ onClick }: any) => {
    console.log('contest data', contests)
    return (
      <button
        onClick={onClick}
        className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 cursor-pointer buttonsummers leftbuttonfestt"
      >
        <ChevronLeft size={24} />
      </button>
    )
  }

  const NextArrow = ({ onClick }: any) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 cursor-pointer buttonsummers righttbuttonfestt"
      >
        <ChevronRight size={24} />
      </button>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div
      className="container max-w-6xl mx-auto px-4 mt-16 mb-20"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="text-center mb-6">
        <h2 className="text-sm font-bold tracking-widest text-[#061E43] flex items-center justify-center uppercase festmainheadingsss">
          <WaveDecoration /> {sectionLabel} <WaveDecoration />
        </h2>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-sm font-extrabold tracking-widest text-[#061E43] flex items-center justify-center festmainheadingsss">
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-10 summerfestcardsslider">
        <Slider {...settings}>
          {contests?.map((contest, index) => {
            const isQuiz = contest.badgeType === 'quiz'

            return (
              <div
                key={index}
                className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 sliderrrrcomponenstssssSummer"
              >
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden rleelleddbd">
                  <img
                    src={contest.image?.url}
                    alt={contest.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white newaddpaididid">
                  <div className="border-b border-gray-100">
                    <div className="flex gap-4 items-start ">
                      <div
                        className={`p-2.5 rounded-full shrink-0 ${
                          isQuiz ? 'bg-amber-500' : 'bg-purple-800'
                        }`}
                      >
                        {isQuiz ? (
                          <HelpCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Camera className="w-5 h-5 text-white" />
                        )}
                      </div>

                      <p className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[14px] md:!text-[16px]">
                        {contest.description}
                      </p>
                    </div>

                    <div className="flex gap-4 items-start ">
                      <div
                        className={`p-2.5 rounded-full shrink-0 ${
                          isQuiz ? 'bg-amber-500' : 'bg-purple-800'
                        }`}
                      >
                        {isQuiz ? (
                          <Upload className="w-5 h-5 text-white" />
                        ) : (
                          <Camera className="w-5 h-5 text-white" />
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-start gap-y-2 gap-x-4 border-b border-gray-100 pb-6 text-xs font-semibold text-gray-600 festflexxxzxxs">
                        {contest.features?.map((feature: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-xs text-[#000] leading-relaxed font-medium festparaa !text-[14px] md:!text-[16px]">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 caasflexxx">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#009494]" />
                      </div>

                      <div>
                        <div className="text-xs text-[#000] leading-relaxed font-medium festparaa !text-[16px]">
                          Starting from
                        </div>

                        <div className="text-lg font-bold text-[#061E43] mb-4 tracking-wide festheadingsss">
                          {contest.startDate}
                        </div>
                      </div>
                    </div>

                    {contest.buttonUrl?.startsWith('http') ? (
                      <a
                        href={contest.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#009494] text-white px-5 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#F0414A] transition-colors shadow-sm cursor-pointer"
                      >
                        Participate Now
                        <div className="bg-white text-[#009494] rounded-full p-0.5">
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      </a>
                    ) : (
                      <Link
                        href={contest.buttonUrl || '#'}
                        className="flex items-center gap-2 bg-[#009494] text-white px-5 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#F0414A] transition-colors shadow-sm cursor-pointer"
                      >
                        Participate Now
                        <div className="bg-white text-[#009494] rounded-full p-0.5">
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
