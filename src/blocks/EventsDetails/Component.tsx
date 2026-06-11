'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  CalendarDays,
  Clock3,
  Mic2,
  Ticket,
  Wallet,
  MapPin,
  Languages,
  Users,
  ShieldCheck,
} from 'lucide-react'

type Props = {
  title?: string
  description?: string
}
export default function FeaturedEventBlockComponent({ title, description }: Props) {
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
        <div className="container mx-auto max-w-7xl px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-72 rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-[300px] rounded bg-gray-200" />
          </div>
        </div>
      </section>
    )
  }

  const WaveDecoration = () => (
    <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
      ~~~
    </span>
  )

  if (!event) return null
  const performer = event?.eventFields?.performers?.[0]?.title || ''
  const eventDates = event?.eventFields?.eventDates || []
  const ticketType = event?.eventFields?.ticketType || ''
  const ticketPrice = event?.eventFields?.ticketPrice || ''
  const eventTime = `${event?.eventFields?.startTime || ''}${
    event?.eventFields?.endTime ? ` - ${event?.eventFields?.endTime}` : ''
  }`
  const aboutBlock = event?.content?.root?.children?.find(
    (item: any) => item?.fields?.blockType === 'aboutEventBlock',
  )
  const locationAddress = aboutBlock?.fields?.locationAddress || ''
  const ageLimit = event?.eventFields?.ageLimit || ''
  const languages = event?.eventFields?.language || []
  const familyFriendly = event?.eventFields?.familyFriendly
  const eventLink = event?.eventFields?.link || ''
  const externalUrl = eventLink?.startsWith('http') ? eventLink : `https://${eventLink}`
  const eventLinkButton = event?.eventFields?.linkbutton || ''
  const locationTitle = aboutBlock?.fields?.locationTitle || ''
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="h-max w-full rounded-2xl bg-white p-6 shadow-lg lg:w-[100%]">
              <div className="mb-12 text-center">
                <h2 className="text-sm font-extrabold tracking-widest text-[#005B70] gap-2 mt-0 mb-0 flex items-center justify-center uppercase festmainheadingsss">
                  <WaveDecoration />
                  Event detail
                  <WaveDecoration />
                </h2>

                <div className="flex items-center justify-center mt-3">
                  <div className="h-1 w-20 rounded bg-[#FCBA13]" />
                </div>
              </div>

              <div className="space-y-3 displayyycategoryyyy">
                {eventDates?.[0]?.date && (
                  <div className="flex gap-4 gapsssssssbutton rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[rgb(226,140,39)]/30 hover:shadow-md">
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

                {ticketPrice && (
                  <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgb(0,75,135)]/10">
                      <Wallet size={26} className="text-[rgb(0,75,135)]" />
                    </div>

                    <div>
                      <h6 className="text-sm font-bold text-gray-900">Ticket Price</h6>

                      <p className="mt-1 text-sm text-gray-600">₹ {ticketPrice}</p>
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
              </div>

              {externalUrl?.trim() && eventLinkButton?.trim() && (
                <a href={externalUrl} className="maineveentssbuttonss">
                  <button className="w-full rounded-lg bg-[rgb(217,35,29)] px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-[rgb(0,75,135)] eveentssbuttonss">
                    {eventLinkButton}
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

