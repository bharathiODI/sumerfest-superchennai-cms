/* eslint-disable @next/next/no-img-element */
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
//######################## ASSETS  #############################################
import iconEmail from '../assets/images/HomePage-Images/Icons/mobile-Header-Email.svg'
import iconEvents from '../assets/images/HomePage-Images/Icons/mobile-Header-Events.svg'
import iconHamburger from '../assets/images/HomePage-Images/Icons/mobile-Header-Hamburger.svg'
import iconSearch from '../assets/images/HomePage-Images/Icons/mobile-Header-Search.svg'
//######################## TYPES  #############################################
import { HeaderClientProps, MenuItem } from '@/models/Header'
import Image from 'next/image'
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  //##################### STATE  ##############################################
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [activeMenu, setActiveMenu] = useState<MenuItem | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  //##################### TIMEOUT  ############################################
  let menuTimeout: NodeJS.Timeout

  //##################### INITIALIZATION #######################################
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setMenuItems(
          (data?.navItems || []).map((item: any) => ({
            label: item.link.label,
            link: item.link.reference?.value?.slug
              ? `/${item.link.reference.value.slug}`
              : item.link.url || '#',
            content: Array.isArray(item?.link?.content)
              ? item.link.content.filter((block: any) => block.title && block.desc && block.link)
              : [],
            contentImage: item?.link?.contentImage
              ? {
                  filename: item.link.contentImage.filename,
                  mimeType: item.link.contentImage.mimeType,
                  url: `/media/${item.link.contentImage.filename}`,
                }
              : undefined,
          })),
        )
        // setDraweLogo(data?.logo)
        // setDrawerMenuItems(data?.drawerMenu || [])
        // setSocialLinks(data?.socialLinks || [])
      } catch (error) {
        console.error('Failed to fetch menu items', error)
      }
    }

    fetchMenuItems()
    // setPointCast(data?.pointCast || null)
  }, [data])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  //############################# HELPER FUNCTIONS ###############################
  const handleMenuEnter = (item: MenuItem) => {
    clearTimeout(menuTimeout)
    setActiveMenu(item)
  }

  const handleMenuLeave = () => {
    menuTimeout = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  const handleScrollToSearchForm = () => {
    const element = document.getElementById('SearchForm')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //################# STICKY LOGIC ###################

  const [footerReached, setFooterReached] = useState(false)

  useEffect(() => {
    const handleFooterScroll = () => {
      const footer = document.querySelector('footer')

      if (!footer) return

      const footerTop = footer.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      setFooterReached(footerTop <= windowHeight)
    }

    window.addEventListener('scroll', handleFooterScroll)

    return () => window.removeEventListener('scroll', handleFooterScroll)
  }, [])

  //#################### RENDER UI#################################################
  return (
    <div className="w-full">
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        {/* #################### DESKTOP MENU NAVBAR ########################### */}

        <nav className="relative hidden w-full flex-col md:flex" onMouseLeave={handleMenuLeave}>
          <div
            className={`grid grid-cols-3 items-center px-8 py-5 transition-all duration-300 ${
              activeMenu ? 'bg-white shadow-md' : ''
            }`}
          >
            {/* LOGO */}
            <div className="flex justify-start">
              <Link href="/" aria-label="Home">
                {data?.logo && typeof data.logo === 'object' && 'filename' in data.logo && (
                  <Image
                    src={`/media/${data.logo.filename}`}
                    alt={data.logo.alt || 'Site Logo'}
                    width={150}
                    height={60}
                    className="h-auto w-[150px] object-contain"
                  />
                )}
              </Link>
            </div>

            {/* DESKTOP MENU CENTER */}
            <div className="flex justify-center">
              <ul className="flex items-center gap-8">
                {menuItems.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer text-sm font-medium uppercase tracking-wide text-black transition hover:text-gray-600"
                    onMouseEnter={() => handleMenuEnter(item)}
                  >
                    <Link href={item.link}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-end">{/* Optional Right Content */}</div>
          </div>

          {/* #################### HOVER MENU ########################### */}

          <AnimatePresence mode="wait">
            {activeMenu && (
              <motion.div
                key={activeMenu.label}
                className="absolute top-full left-0 hidden w-full bg-white shadow-2xl md:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <motion.div
                  className="mx-auto flex max-w-7xl items-start justify-between gap-12 px-10 py-12"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                >
                  {/* MENU CONTENT */}

                  <div className="grid flex-1 grid-cols-2 gap-8">
                    {activeMenu.content.map((block, index) => (
                      <motion.div
                        key={index}
                        className="cursor-pointer rounded-2xl border border-gray-100 p-5 transition hover:bg-gray-50"
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={() => {
                          const linkPath = block.link.startsWith('/')
                            ? block.link
                            : `/${block.link}`

                          if (activeMenu?.link) {
                            sessionStorage.setItem('parentSlug', activeMenu.link)
                          }

                          router.push(linkPath)

                          setActiveMenu(null)

                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          })
                        }}
                      >
                        <h4 className="mb-2 text-lg font-semibold text-black">{block.title}</h4>

                        <p className="text-sm leading-relaxed text-gray-600">{block.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* IMAGE */}

                  {activeMenu?.contentImage?.url && (
                    <div className="w-[320px] overflow-hidden rounded-3xl">
                      <img
                        className="h-full w-full object-cover"
                        src={activeMenu.contentImage.url}
                        alt="Menu Content"
                      />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* #################### MOBILE NAVBAR ########################### */}

        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm md:hidden">
          {/* EVENTS ICON */}

          <div className="flex h-10 w-10 items-center justify-center">
            <img src={iconEvents.src} alt="Events Icon" />
          </div>

          {/* EMAIL ICON */}

          <div className="flex h-10 w-10 items-center justify-center">
            <img src={iconEmail.src} alt="Email Icon" />
          </div>

          {/* MOBILE LOGO */}

          <div className="flex items-center justify-center">
            <Link href="/">
              {data?.logo && typeof data.logo === 'object' && 'url' in data.logo && (
                <img
                  src={`/media/${data.logo.filename}`}
                  alt={data.logo.alt || 'Site Logo'}
                  className="max-h-[60px] object-contain"
                />
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
