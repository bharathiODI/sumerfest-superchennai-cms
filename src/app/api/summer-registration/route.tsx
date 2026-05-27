// import { NextRequest, NextResponse } from 'next/server'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { createTransporter } from '@/utilities/emailComponents/transporter'

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     const payload = await getPayload({
//       config,
//     })

//     const registration = await payload.create({
//       collection: 'summer-registrations',

//       data: {
//         summer: body.arattaiId,

//         name: body.values?.name || '',

//         email: body.values?.email || '',

//         phone: body.values?.phone || body.values?.mobile || body.values?.phoneNumber || '',

//         values: body.values,
//       },
//     })

//     const transporter = createTransporter()

//     if (registration?.email) {
//       await transporter.sendMail({
//         from: `"Super Chennai" <${process.env.SMTP_USER}>`,

//         to: registration.email,

//         subject: 'Registration Confirmed',

//         html: body.emailTemplate,
//       })
//     }

//     return NextResponse.json({
//       success: true,
//     })
//   } catch (error: any) {
//     console.log(error)

//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message,
//       },
//       {
//         status: 500,
//       },
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { createTransporter } from '@/utilities/emailComponents/transporter'

export async function POST(req: NextRequest) {
  try {
    /* ======================================================
       GET FORM DATA
    ====================================================== */

    const formData = await req.formData()

    const eventId = formData.get('eventId')
    const slug = formData.get('slug')
    const emailTemplate = formData.get('emailTemplate')

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Event ID is required',
        },
        {
          status: 400,
        },
      )
    }

    /* ======================================================
       PARSE VALUES
    ====================================================== */

    let values: Record<string, any> = {}

    try {
      values = JSON.parse(String(formData.get('values') || '{}'))
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form values JSON',
        },
        {
          status: 400,
        },
      )
    }

    /* ======================================================
       PAYLOAD INSTANCE
    ====================================================== */

    const payload = await getPayload({
      config,
    })

    /* ======================================================
       CREATE REGISTRATION
    ====================================================== */

    const registration = await payload.create({
      collection: 'summer-registrations',

      data: {
        summer: Number(eventId),

        status: 'pending',

        name: values?.name || '',

        email: values?.email || '',

        phone: values?.phone || values?.mobile || values?.phoneNumber || '',

        company: values?.company || '',

        values,
      },
    })

    /* ======================================================
       SEND MAIL
    ====================================================== */

    const transporter = createTransporter()

    if (registration?.email) {
      await transporter.sendMail({
        from: `"Super Chennai" <${process.env.SMTP_USER}>`,

        to: registration.email,

        subject: 'Registration Confirmed',

        html: String(emailTemplate || ''),
      })
    }

    /* ======================================================
       RESPONSE
    ====================================================== */

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully',
      registration,
    })
  } catch (error: any) {
    console.log('SUMMER REGISTRATION ERROR:', error)

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Something went wrong',
      },
      {
        status: 500,
      },
    )
  }
}
