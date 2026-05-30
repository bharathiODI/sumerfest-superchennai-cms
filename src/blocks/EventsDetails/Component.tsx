/* eslint-disable @next/next/no-img-element */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  CalendarDays,
  Clock3,
  Mic2,
  Ticket,
  MapPin,
  Languages,
  Users,
  ShieldCheck,
  Link2,
} from 'lucide-react'
type Props = {
  block: {
    title?: string
    description?: string
  }
}

export default function FeaturedEventBlockComponent({ block }: Props) {
  const params = useParams()

  const slug = params?.slug as string

  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchEvent(slug)
    }
  }, [slug])

  const fetchEvent = async (eventSlug: string) => {
    try {
      setLoading(true)

      const res = await axios.get(`/api/summer-events-lisings/${eventSlug}`)

      setEvent(res?.data?.doc || null)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-72 rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-[300px] rounded bg-gray-200" />
          </div>
        </div>
      </section>
    )
  }

  if (!event) return null

  const title = event?.eventFields?.title || ''

  const imageUrl = event?.heroImage?.url || event?.eventFields?.featuredImage?.url || ''

  const performer = event?.eventFields?.performers?.[0]?.title || ''

  const eventType = event?.eventFields?.eventType?.title || ''

  const week = event?.eventFields?.week?.title || ''

  const eventDates = event?.eventFields?.eventDates || []

  const ticketType = event?.eventFields?.ticketType || ''

  const featured = event?.eventFields?.featured || false

  const eventTime = `${event?.eventFields?.startTime || ''}${
    event?.eventFields?.endTime ? ` - ${event?.eventFields?.endTime}` : ''
  }`

  const aboutBlock = event?.content?.root?.children?.find(
    (item: any) => item?.fields?.blockType === 'aboutEventBlock',
  )

  const registrationBlock = event?.content?.root?.children?.find(
    (item: any) => item?.fields?.blockType === 'eventRegistration',
  )

  const aboutDescription =
    aboutBlock?.fields?.description || event?.eventFields?.shortDescription || ''

  const locationAddress = aboutBlock?.fields?.locationAddress || ''

  const registrationTitle = registrationBlock?.fields?.registrationTitle

  const registrationDescription = registrationBlock?.fields?.registrationDescription

  const registrationPoints = registrationBlock?.fields?.registrationPoints || []

  const ageLimit = event?.eventFields?.ageLimit || ''

  const languages = event?.eventFields?.language || []

  const familyFriendly = event?.eventFields?.familyFriendly

  const eventLink = event?.eventFields?.link || ''

  const externalUrl = eventLink?.startsWith('http') ? eventLink : `https://${eventLink}`

  const eventLinkButton = event?.eventFields?.linkbutton || 'Book Now'

  const venue = event?.eventFields?.venue?.title || ''

  const highlights = aboutBlock?.fields?.highlights || []

  const locationTitle = aboutBlock?.fields?.locationTitle || ''

  const mapLink = aboutBlock?.fields?.mapLink || ''

  return (
    <>
      <section className="">
        <div className="mx-auto max-w-10xl px-4 md:px-8">
          {(block?.title || block?.description) && (
            <div className="mb-12 text-center">
              {block?.title && (
                <h2 className="mb-3 text-4xl font-bold text-gray-900">{block.title}</h2>
              )}

              {block?.description && (
                <p className="mx-auto max-w-3xl text-gray-600">{block.description}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* LEFT */}

            <div className="flex-1">
              <h2 className="mb-2  capitalize text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-[#D9231D]">
                {title}
              </h2>

              {(performer || eventType) && (
                <p className="text-[#004B87] uppercase tracking-wider font-bold text-sm sm:text-base">
                  {performer}
                  {performer && eventType ? ` • ${eventType}` : eventType}
                </p>
              )}

              {imageUrl && (
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full rounded-2xl object-cover shadow-lg"
                  />
                </div>
              )}

              <div className="mb-6 flex flex-wrap gap-2">
                {eventType && (
                  <span className="rounded-md bg-pink-100 px-3 py-1 text-sm text-pink-700">
                    {eventType}
                  </span>
                )}

                {ticketType && (
                  <span className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-700">
                    {ticketType}
                  </span>
                )}

                {week && (
                  <span className="rounded-md bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {week}
                  </span>
                )}

                {featured && (
                  <span className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    Featured Event
                  </span>
                )}
              </div>

              <div className="rounded-2xl bg-white  shadow-sm">
                <h3 className="mb-3 text-xl font-semibold">About The Event</h3>

                <p className="leading-7 text-gray-700">{aboutDescription}</p>
              </div>

              {registrationTitle && (
                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold">{registrationTitle}</h3>

                  {registrationDescription && (
                    <p className="mb-5 text-gray-700">{registrationDescription}</p>
                  )}

                  <ul className="space-y-3">
                    {registrationPoints.map((item: any, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span>✓</span>
                        <span>{item.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT */}

            <div className="h-max w-full rounded-2xl bg-white p-6 shadow-lg lg:w-[340px]">
              <h4 className="mb-5 text-xl font-semibold">Event Details</h4>

              <div className="space-y-3">
                {eventDates?.[0]?.date && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[rgb(226,140,39)]/30 hover:shadow-md">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(0,75,135)]/10">
                      <CalendarDays size={26} className="text-[rgb(0,75,135)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">Event Date</h6>

                      <p className="mt-1 text-sm text-gray-600">
                        {new Date(eventDates[0].date).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {eventTime.trim() && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(217,35,29)]/10">
                      <Clock3 size={26} className="text-[rgb(217,35,29)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">Event Time</h6>

                      <p className="mt-1 text-sm text-gray-600">{eventTime}</p>
                    </div>
                  </div>
                )}

                {performer && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(226,140,39)]/10">
                      <Mic2 size={26} className="text-[rgb(226,140,39)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">Performer</h6>

                      <p className="mt-1 text-sm text-gray-600">{performer}</p>
                    </div>
                  </div>
                )}

                {ticketType && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(0,75,135)]/10">
                      <Ticket size={26} className="text-[rgb(0,75,135)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">Ticket Type</h6>

                      <p className="mt-1 text-sm text-gray-600">{ticketType}</p>
                    </div>
                  </div>
                )}

                {locationAddress && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(217,35,29)]/10">
                      <MapPin size={26} className="text-[rgb(217,35,29)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">{locationTitle}</h6>

                      <p className="mt-1 text-sm text-gray-600">{locationAddress}</p>
                    </div>
                  </div>
                )}
              </div>
              {ageLimit && (
                <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(226,140,39)]/10">
                    <ShieldCheck size={26} className="text-[rgb(226,140,39)]" />
                  </div>

                  <div>
                    <h6 className="text-sm font-bold text-gray-900">Age Limit</h6>

                    <p className="mt-1 text-sm text-gray-600">{ageLimit}</p>
                  </div>
                </div>
              )}

              {languages.length > 0 && (
                <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(0,75,135)]/10">
                    <Languages size={26} className="text-[rgb(0,75,135)]" />
                  </div>

                  <div>
                    <h6 className="text-sm font-bold text-gray-900">Languages</h6>

                    <p className="mt-1 text-sm text-gray-600">{languages.join(', ')}</p>
                  </div>
                </div>
              )}

              {familyFriendly && (
                <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(217,35,29)]/10">
                    <Users size={26} className="text-[rgb(217,35,29)]" />
                  </div>

                  <div>
                    <h6 className="text-sm font-bold text-gray-900">Family Friendly</h6>

                    <p className="mt-1 text-sm text-gray-600">Suitable for families</p>
                  </div>
                </div>
              )}

              <a href={externalUrl}>
                <button className="w-full rounded-lg bg-[rgb(217,35,29)] px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-[rgb(0,75,135)]">
                  {eventLinkButton}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
