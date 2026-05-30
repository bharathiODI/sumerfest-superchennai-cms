/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useCallback, useMemo, useState } from 'react'

import axios from 'axios'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { render } from '@react-email/render'

import SummerFestRegistrationEmail from './SummerFestRegistrationEmail'
import LexicalRenderer from '../lexical/LexicalRenderer'
import { CheckCircle2, Sparkles, X } from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

interface Media {
  id?: number
  url?: string
  alt?: string | null
}

interface CustomFieldOption {
  label: string
  value: string
}

interface CustomField {
  id?: number | string
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
  options?: CustomFieldOption[]
}

interface EventDate {
  id?: string
  date: string
}

interface SummerFestDetailsProps {
  data: any
}

/* =========================================================
   HELPERS
========================================================= */

const normalizeFieldName = (name?: string) => {
  return name?.trim()?.toLowerCase() || ''
}

const getFieldValue = (formData: Record<string, any>, fieldName: string) => {
  return formData[normalizeFieldName(fieldName)]
}

const setFieldValue = (prev: Record<string, any>, fieldName: string, value: any) => {
  return {
    ...prev,
    [normalizeFieldName(fieldName)]: value,
  }
}

const WaveDecoration = () => (
  <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
    ~~~
  </span>
)

/* =========================================================
   COMPONENT
========================================================= */

const SummerFestDetails: React.FC<SummerFestDetailsProps> = ({ data }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const [loading, setLoading] = useState(false)

  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  if (!data) return null

  /* =========================================================
     EVENT DATA
  ========================================================= */

  const eventFields = data?.eventFields || {}

  const registrationSettings = data?.formSettings?.regSettings || {}

  const customFields: CustomField[] = Array.isArray(data?.formSettings?.customFields)
    ? data.formSettings.customFields
    : []

  const title = eventFields?.title || data?.title || 'Event'

  const description = eventFields?.description || null

  const shortDescription = eventFields?.shortDescription || ''

  const featuredImage: Media = eventFields?.featuredImage

  const mobileImage: Media = data?.mobileImage

  const heroImage: Media = data?.heroImage

  const gallery = eventFields?.gallery || []

  const venue = eventFields?.venue?.title || 'Venue TBA'

  const eventDates: EventDate[] = eventFields?.eventDates || []

  const isRegistrationOpen = registrationSettings?.isRegistrationOpen ?? false

  const enableOTP = registrationSettings?.enableOTP ?? false

  const thankYouMessage = registrationSettings?.thankYouMessage || ''

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  // const formattedDate = useMemo(() => {
  //   if (!eventDates?.length) return 'Date Coming Soon'

  //   return new Date(eventDates[0]?.date).toLocaleDateString('en-IN', {
  //     weekday: 'long',
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   })
  // }, [eventDates])

  /* =========================================================
     FORM
  ========================================================= */

  const handleChange = useCallback((fieldName: string, value: any) => {
    setFormData((prev) => setFieldValue(prev, fieldName, value))
  }, [])

  const validateForm = () => {
    for (const field of customFields) {
      const value = getFieldValue(formData, field.name)

      if (field.required && (!value || value === '')) {
        toast.error(`${field.label} is required`)

        return false
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(value)) {
          toast.error('Enter valid email')

          return false
        }
      }
    }

    return true
  }

  /* =========================================================
     OTP
  ========================================================= */

  const mobileField = customFields.find(
    (field) =>
      field.type === 'number' ||
      normalizeFieldName(field.name).includes('mobile') ||
      normalizeFieldName(field.name).includes('phone'),
  )

  const sendOtpToMobile = async () => {
    try {
      if (!mobileField) {
        toast.error('Mobile field not found')
        return
      }

      const mobile = getFieldValue(formData, mobileField.name)

      if (!mobile) {
        toast.error('Enter mobile number')
        return
      }

      if (String(mobile).length < 10) {
        toast.error('Enter valid mobile number')
        return
      }

      setSendingOtp(true)

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()

      setGeneratedOtp(newOtp)

      await axios.post('/api/send-otp', {
        mobile,
        otp: newOtp,
      })

      toast.success('OTP sent successfully')
    } catch (error) {
      toast.error('Failed to send OTP')
    } finally {
      setSendingOtp(false)
    }
  }

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true)

      toast.success('OTP verified successfully')
    } else {
      toast.error('Invalid OTP')
    }
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    if (!validateForm()) return

    if (enableOTP && !otpVerified) {
      toast.error('Please verify OTP')

      return
    }

    try {
      setLoading(true)

      const emailHtml = await render(
        <SummerFestRegistrationEmail
          title={title}
          values={formData}
          thankYouMessage={thankYouMessage}
        />,
      )

      const payload = new FormData()

      payload.append('eventId', String(data?.id))

      payload.append('slug', String(data?.slug))

      payload.append('emailTemplate', emailHtml)

      const serializedValues: Record<string, any> = {}

      customFields.forEach((field) => {
        const value = getFieldValue(formData, field.name)

        if (field.type === 'file') {
          if (value instanceof File) {
            payload.append(normalizeFieldName(field.name), value)
          }
        } else {
          serializedValues[normalizeFieldName(field.name)] = value
        }
      })

      payload.append('values', JSON.stringify(serializedValues))

      await axios.post('/api/summer-registration', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Registration submitted successfully')
      setShowSuccessModal(true)

      setFormData({})
      setOtp('')
      setGeneratedOtp('')
      setOtpVerified(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     FIELD RENDER
  ========================================================= */

  const renderField = (field: CustomField) => {
    const fieldName = normalizeFieldName(field.name)

    const commonClass =
      'w-full rounded-[5px] border border-gray-300 bg-white px-5 py-4 outline-none transition-all focus:border-orange-500 mt-2 inputttssss '

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={fieldName}
            placeholder={field.placeholder}
            required={field.required}
            rows={5}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )

      case 'select':
        return (
          <select
            name={fieldName}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          >
            <option value="">Select {field.label}</option>

            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'email':
        return (
          <input
            type="email"
            name={fieldName}
            placeholder="Enter your Email Id"
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )

      case 'number':
        return (
          <input
            type="tel"
            inputMode="numeric"
            name="{fieldName}"
            placeholder="Enter your Mobile Number"
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value.replace(/\D/g, ''))}
            className={commonClass}
          />
        )

      case 'file':
        return (
          <input
            type="file"
            name={fieldName}
            required={field.required}
            onChange={(e) => handleChange(field.name, e.target.files?.[0] || null)}
            className={commonClass}
          />
        )

      default:
        return (
          <input
            type="text"
            name={fieldName}
            placeholder="Enter your Name"
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )
    }
  }

  return (
    <>
      <ToastContainer position="top-center" />

      {/* HERO */}

      {/* <section className="relative overflow-hidden">
        <div className="relative h-[80vh] min-h-[600px] w-full">
        

          {heroImage?.url && (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || title}
              fill
              priority
              className="hidden object-cover md:block"
            />
          )}

         

          {mobileImage?.url && (
            <Image
              src={mobileImage.url}
              alt={title}
              fill
              priority
              className="object-cover md:hidden"
            />
          )}

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="max-w-4xl"
              >
                <span className="inline-flex rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold uppercase tracking-[2px] text-white">
                  Super Chennai Event
                </span>

                <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-7xl">
                  {title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
                  {shortDescription}
                </p>

                <div className="mt-10 flex flex-wrap gap-5">
                  <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
                    <p className="text-sm text-orange-300">Date</p>

                    <h4 className="font-semibold text-white">{formattedDate}</h4>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
                    <p className="text-sm text-orange-300">Venue</p>

                    <h4 className="font-semibold text-white">{venue}</h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="relative overflow-hidden">
        <div className="relative w-full">
          {/* DESKTOP IMAGE */}
          {heroImage?.url && (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || title}
              width={1920}
              height={1080}
              priority
              className="hidden md:block w-full h-auto object-contain"
            />
          )}

          {/* MOBILE IMAGE */}
          {mobileImage?.url && (
            <Image
              src={mobileImage.url}
              alt={title}
              width={800}
              height={1200}
              priority
              className="block md:hidden w-full h-auto object-contain mt-20"
            />
          )}

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="max-w-4xl"
              >
                {/* CONTENT HERE */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="bg-white py-20 ">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <LexicalRenderer content={data?.content} eventData={data} />
          </div>
        </div>
      </section>

      {/* CLOSED */}

      {!isRegistrationOpen && (
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-[32px] border border-red-200 bg-red-50 p-12 text-center">
              <h2 className="text-4xl font-black text-red-600">Registration Closed</h2>

              <p className="mt-4 text-gray-600">Registration currently closed.</p>
            </div>
          </div>
        </section>
      )}

      {/* FORM */}

      {/* {isRegistrationOpen && (
        <section className=" py-20 ">
          <div className="mb-10 text-center">
            <h2 className="text-sm font-extrabold tracking-widest text-[#005B70] gap-2 mt-0 mb-0 flex items-center justify-center uppercase festmainheadingsss">
              <WaveDecoration />
              REGISTER FOR THIS <span className="text-[#E0533C]"> EVENT</span>
              <WaveDecoration />
            </h2>

            <div className="flex items-center justify-center">
              <div className="w-20 h-1 bg-[#FCBA13] mt-2 rounded text-center"></div>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 md:px-8 formmaxcontainer">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-8 padddddd">
              <h2 className="text-xl font-bold tracking-wide text-[#005B70]">
                REGISTER <span className="text-[#061E43]">FOR THIS EVENT</span>{' '}
              </h2>

              <form onSubmit={submitForm} className="py-8">
                <div className="grid gap-8 md:grid-cols-2 flexxxxcontainer">
                  {customFields.map((field, index) => (
                    <div
                      key={field.id || index}
                      className={
                        field.type === 'textarea'
                          ? 'md:col-span-2 inputsssboxsss'
                          : 'inputsssboxsss'
                      }
                    >
                      <label className="text-xs text-[#000] mb-3 leading-relaxed font-medium festparaa !text-[16px] mb-10">
                        {field.label}

                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </label>

                      {renderField(field)}
                    </div>
                  ))}

                  <div className="butooonnssss">
                    <button
                      type="button"
                      onClick={sendOtpToMobile}
                      disabled={sendingOtp}
                      className="mt-6 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-600 disabled:opacity-60 buttonsubmitttt"
                    >
                      {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>

                  {generatedOtp && (
                    <>
                      <div className="inputsssboxsss">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full rounded-[5px] border border-gray-300 bg-white px-5 py-4 outline-none transition-all focus:border-orange-500 mt-2 inputttssss otpinputss "
                        />
                      </div>

                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="rounded-2xl bg-black px-8 py-4 font-semibold text-white buttonsubmitttt verifyottpbitt"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>

                

                {enableOTP && !otpVerified && (
                  <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-8">
                    <h3 className="text-2xl font-bold">Mobile Verification</h3>

                    <button
                      type="button"
                      onClick={sendOtpToMobile}
                      disabled={sendingOtp}
                      className="mt-6 rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-60"
                    >
                      {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    {generatedOtp && (
                      <div className="mt-6 flex flex-col gap-4 md:flex-row">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="flex-1 rounded-2xl border border-gray-300 px-5 py-4 outline-none"
                        />

                        <button
                          type="button"
                          onClick={verifyOtp}
                          className="rounded-2xl bg-black px-8 py-4 font-bold text-white"
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {otpVerified && (
                  <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
                    OTP verified successfully
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-12 w-full font-semibold rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-8 py-5 text-lg font-black text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-60 submitbuttonssss"
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>
          </div>
        </section>
      )} */}

      {/* =========================================================
       SUCCESS MODAL
       ========================================================= */}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
            className="
        relative overflow-hidden
        rounded-[35px]
        bg-white
        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
        max-w-xl
        w-full
        p-10
        text-center
      "
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() => setShowSuccessModal(false)}
              className="
          absolute right-5 top-5
          flex h-10 w-10 items-center justify-center
          rounded-full bg-gray-100
          transition-all hover:bg-gray-200
        "
            >
              <X className="h-5 w-5 text-black" />
            </button>

            {/* BACKGROUND GLOW */}

            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-orange-200 blur-3xl opacity-40" />

            {/* ICON */}

            <div className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300 shadow-2xl">
              <CheckCircle2 className="h-14 w-14 text-white" />
            </div>

            {/* CONTENT */}

            <div className="relative z-10 mt-8">
              <div className="mb-3 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />

                <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
                  Registration Successful
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight text-[#061E43]">Thank You!</h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Your registration for <span className="font-bold text-orange-500">{title}</span> has
                been successfully submitted.
              </p>

              <p className="mt-3 text-sm text-gray-500">
                We’ll contact you soon with event details and confirmation.
              </p>
            </div>

            {/* BUTTON */}

            <div className="relative z-10 mt-10">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="
            rounded-full
            bg-gradient-to-r
            from-orange-500
            via-amber-500
            to-yellow-400
            px-10
            py-4
            text-sm
            font-bold
            uppercase
            tracking-[2px]
            text-white
            shadow-xl
            transition-all
            hover:scale-105
          "
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default SummerFestDetails
