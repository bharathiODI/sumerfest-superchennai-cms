'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { render } from '@react-email/render'

import { CheckCircle2, Sparkles, X } from 'lucide-react'
import SummerFestRegistrationEmail from '@/components/Summer/SummerFestRegistrationEmail'

/* =========================================================
   TYPES
========================================================= */

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

type Props = {
  block: any
  eventData: any
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

const EventRegistrationBlockComponent: React.FC<Props> = ({ block, eventData }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const showImage = block?.showImage
  const sideImage = block?.sideImage
  const imagePosition = block?.imagePosition || 'left'

  /* =========================================================
     EVENT DATA
  ========================================================= */

  const registrationSettings = eventData?.formSettings?.regSettings || {}

  const customFields: CustomField[] = Array.isArray(eventData?.formSettings?.customFields)
    ? eventData.formSettings.customFields
    : []

  const title = eventData?.eventFields?.title || eventData?.title || 'Event'

  const sectionSubTitle = block?.sectionSubTitle || ''

  const sectionDescrption = block?.sectionDescrption || ''

  const isRegistrationOpen = registrationSettings?.isRegistrationOpen ?? false

  const enableOTP = registrationSettings?.enableOTP ?? false

  const thankYouMessage = registrationSettings?.thankYouMessage || ''

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

      payload.append('eventId', String(eventData?.id))

      payload.append('slug', String(eventData?.slug))

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
      'w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none transition-all focus:border-orange-500 mt-2'

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
            placeholder="Enter your Email"
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
            name={fieldName}
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
            placeholder={`Enter ${field.label}`}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )
    }
  }

  if (!isRegistrationOpen) return null

  return (
    <>
      <ToastContainer position="top-center" />

      <section className="relative py-20 overflow-hidden bg-white">
        <div className="absolute inset-0 " />

        <div className="relative z-10">
          {/* HEADING */}

          <div className="mb-12 text-center">
            <h2 className="text-sm font-extrabold tracking-widest text-[#005B70] gap-2 mt-0 mb-0 flex items-center justify-center uppercase festmainheadingsss">
              <WaveDecoration />
              {block?.sectionTitle || ''}
              <WaveDecoration />
            </h2>

            <div className="flex items-center justify-center mt-3">
              <div className="h-1 w-20 rounded bg-[#FCBA13]" />
            </div>
          </div>

          {/* FORM */}

          <div
            className={`
    px-4
    ${showImage && sideImage?.url ? 'mx-auto max-w-7xl' : 'mx-auto max-w-3xl'}
  `}
          >
            <div
              className={`
      overflow-hidden rounded-[30px]
      border  bg-white shadow-1xl
      ${showImage && sideImage?.url ? 'grid items-stretch lg:grid-cols-2' : ''}
    `}
            >
              {/* =========================================================
       LEFT IMAGE
    ========================================================= */}

              {showImage && sideImage?.url && imagePosition === 'left' && (
                <div className="relative h-[320px] lg:min-h-full self-stretch">
                  <Image
                    src={sideImage.url}
                    alt={sideImage.alt || title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* =========================================================
       FORM
    ========================================================= */}

              <div
                className={`
        p-6 md:p-10 lg:p-14
        ${block?.enableGlassEffect ? 'backdrop-blur-xl bg-white/90' : 'bg-white'}
      `}
              >
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />

                    <span className="text-xs font-bold uppercase tracking-[3px] text-orange-500">
                      Registration Form
                    </span>
                  </div>

                  <h2 className="mt-5 text-4xl font-black leading-tight text-[#061E43]">
                    {sectionSubTitle}
                  </h2>

                  <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
                    {sectionDescrption}
                  </p>
                </div>
                <form onSubmit={submitForm} className="space-y-8">
                  {/* =========================================================
                     FIELDS
                   ========================================================= */}

                  <div className="grid gap-8 md:grid-cols-2">
                    {customFields.map((field, index) => (
                      <div
                        key={field.id || index}
                        className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                      >
                        <label className="text-sm font-semibold text-[#061E43]">
                          {field.label}

                          {field.required && <span className="ml-1 text-red-500">*</span>}
                        </label>

                        {renderField(field)}
                      </div>
                    ))}
                  </div>

                  {/* =========================================================
           OTP SECTION
        ========================================================= */}

                  {enableOTP && (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={sendOtpToMobile}
                        disabled={sendingOtp}
                        className="
                rounded-xl
                bg-orange-500
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                hover:bg-orange-600
                disabled:opacity-60
              "
                      >
                        {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                      </button>

                      {generatedOtp && (
                        <div className="flex flex-col gap-4 md:flex-row">
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="
                    flex-1 rounded-xl border border-gray-300
                    px-5 py-4 outline-none
                    transition-all
                    focus:border-orange-500
                  "
                          />

                          <button
                            type="button"
                            onClick={verifyOtp}
                            className="
                    rounded-xl
                    bg-black
                    px-8
                    py-4
                    font-semibold
                    text-white
                  "
                          >
                            Verify OTP
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* =========================================================
           OTP VERIFIED
        ========================================================= */}

                  {otpVerified && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
                      OTP verified successfully
                    </div>
                  )}

                  {/* =========================================================
           SUBMIT
        ========================================================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
            w-full rounded-2xl
            bg-gradient-to-r
            from-orange-500
            via-amber-500
            to-yellow-500
            px-8
            py-5
            text-lg
            font-black
            text-white
            shadow-xl
            transition-all
            hover:scale-[1.01]
            disabled:opacity-60
          "
                  >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </form>
              </div>

              {/* =========================================================
       RIGHT IMAGE
    ========================================================= */}

              {showImage && sideImage?.url && imagePosition === 'right' && (
                <div className="relative order-first h-[320px] lg:order-none lg:h-auto lg:min-h-[750px]">
                  <Image
                    src={sideImage.url}
                    alt={sideImage.alt || title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-2xl md:p-10">
              <form onSubmit={submitForm} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {customFields.map((field, index) => (
                    <div
                      key={field.id || index}
                      className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                    >
                      <label className="text-sm font-semibold text-[#061E43]">
                        {field.label}

                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </label>

                      {renderField(field)}
                    </div>
                  ))}
                </div>


                {enableOTP && (
                  <>
                    <button
                      type="button"
                      onClick={sendOtpToMobile}
                      disabled={sendingOtp}
                      className=" bg-orange-500 px-8 py-4 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-60"
                    >
                      {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    {generatedOtp && (
                      <div className="flex flex-col gap-4 md:flex-row">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="flex-1  border border-gray-300 px-5 py-4 outline-none focus:border-orange-500"
                        />

                        <button
                          type="button"
                          onClick={verifyOtp}
                          className=" bg-black px-8 py-4 font-semibold text-white"
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </>
                )}

                {otpVerified && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
                    OTP verified successfully
                  </div>
                )}


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full  bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-8 py-5 text-lg font-black text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>
          </div> */}
        </div>
      </section>

      {/* SUCCESS MODAL */}

      <AnimatePresence>
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
              }}
              className="relative w-full max-w-xl overflow-hidden rounded-[35px] bg-white p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
            >
              {/* CLOSE */}

              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200"
              >
                <X className="h-5 w-5 text-black" />
              </button>

              {/* GLOW */}

              <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-orange-200 opacity-40 blur-3xl" />

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

                <h2 className="text-4xl font-black text-[#061E43]">Thank You!</h2>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Your registration for <span className="font-bold text-orange-500">{title}</span>{' '}
                  has been successfully submitted.
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  We’ll contact you soon with confirmation details.
                </p>
              </div>

              {/* BUTTON */}

              <div className="relative z-10 mt-10">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-10 py-4 text-sm font-bold uppercase tracking-[2px] text-white shadow-xl transition-all hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EventRegistrationBlockComponent
