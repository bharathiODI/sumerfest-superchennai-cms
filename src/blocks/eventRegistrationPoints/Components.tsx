// /* eslint-disable @next/next/no-img-element */

// import React from 'react'

// export const EventRegistrationComponent = ({
//   registrationTitle,
//   registrationDescription,
//   registrationImage,
//   registrationPoints,
//   buttonText,
//   buttonLink,
// }: any) => {
//   return (
//     <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#fff7ef]">
//       <div className="max-w-10xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//         {/* LEFT CONTENT */}
//         <div>
//           <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-5">
//             Summer Fest Registration
//           </span>

//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//             {registrationTitle}
//           </h2>

//           {registrationDescription && (
//             <p className="text-lg text-gray-600 leading-8 mb-8">{registrationDescription}</p>
//           )}

//           {/* POINTS */}
//           <div className="space-y-4 mb-10">
//             {registrationPoints?.map((item: any, index: number) => (
//               <div key={index} className="flex items-start gap-4">
//                 <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold mt-1">
//                   ✓
//                 </div>

//                 <p className="text-gray-700 text-lg leading-7">{item.point}</p>
//               </div>
//             ))}
//           </div>

//           {/* BUTTON */}
//           {buttonText && (
//             <a
//               href={buttonLink}
//               className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:scale-105 transition-all duration-300"
//             >
//               {buttonText}
//             </a>
//           )}
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="relative">
//           <div className="overflow-hidden rounded-[32px] shadow-2xl">
//             <img
//               src={registrationImage?.url}
//               alt={registrationTitle}
//               className="w-full h-[650px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

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
    <div className="container max-w-7xl mx-auto px-4 paddingsection !pt-[0]">
      <div className="bg-[#fdfdfd] rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row items-stretch min-h-[380px]">
        {/* <div className="max-w-10xl mx-auto grid lg:grid-cols-2 gap-12 items-center"> */}
        {/* LEFT CONTENT */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-r from-white via-white to-gray-50/30">
          {/* <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-5">
              Summer Fest Registration
            </span> */}

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-wide text-[#005B70] tracking-wide text-slate-800 mt-0 mb-0">
              {registrationTitle}
            </h2>
            <div className="w-8 h-1 bg-amber-400 mt-2 rounded-full"></div>
          </div>

          {/* {registrationDescription && (
            <p className="text-lg text-gray-600 leading-8 mb-8">{registrationDescription}</p>
          )} */}

          {/* POINTS */}
          <div className="space-y-5">
            {registrationPoints?.map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-1 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500 font-bold text-xs">
                  ✓
                </div>

                <p className=" text-sm lg:text-base festparaa mt-0 mb-0">{item.point}</p>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          {/* {buttonText && (
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              {buttonText}
            </a>
          )} */}
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 relative min-h-[250px] md:min-h-full">
          {/* <div className="overflow-hidden rounded-[32px] shadow-2xl"> */}
          <div className='hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 patchssswhite'></div>
          <img
            src={registrationImage?.url}
            alt={registrationTitle}
            className="w-full h-full object-cover mt-0"
          />
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}
