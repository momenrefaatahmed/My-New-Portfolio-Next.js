'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
// Aniamtion
import AnimatedContent from '@/components/ui/AnimatedContent'
import ElectricBorder from '@/components/ui/ElectricBorder'
// Aniamtion
//Hooks
import { useState } from 'react'
//Hooks

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (sectionId) => {
    setOpenDrawer(false)

    if (pathname !== '/') {
      router.push(`/#${sectionId}`)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <div className="top-0 left-0 w-full z-50 bg-transparent">
        <div className="container mx-auto">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="bounce.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <ElectricBorder
              color="#44e279"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <div className="w-full h-15 mt-5 rounded-4xl bg-transparent relative z-30 flex items-center justify-between px-5">
                {/* Logo */}
                <div>
                  <Link
                    className="text-green-400 text-xl"
                    style={{ fontFamily: 'BBH Sans Hegarty' }}
                    href="/"
                  >
                    My PortFolio
                  </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-5 font-bold text-green-400">
                  <li>
                    <button
                      onClick={() => handleNavigation('about')}
                      className="py-3 px-5 rounded-4xl hover:bg-green-400 hover:text-white transition-all"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('projects')}
                      className="py-3 px-5 rounded-4xl hover:bg-green-400 hover:text-white transition-all"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('contact')}
                      className="py-3 px-5 rounded-4xl hover:bg-green-400 hover:text-white transition-all"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                  title="menu"
                  onClick={() => setOpenDrawer(true)}
                  className="md:hidden text-green-400 px-4 py-2 rounded-2xl text-2xl flex items-center justify-center"
                >
                  <IoMdMenu />
                </button>
              </div>
            </ElectricBorder>
          </AnimatedContent>
        </div>

        {/* Drawer for Mobile */}
        <div
          className={`fixed top-0 right-0 h-screen w-[80%] bg-black/90 z-50 transition-transform duration-500 ${
            openDrawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setOpenDrawer(false)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>

          {/* Drawer Links */}
          <div className="mt-20 flex flex-col items-center gap-6 text-green-400 text-xl font-bold">
            <button
              onClick={() => handleNavigation('projects')}
              className="hover:text-white transition-all"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="hover:text-white transition-all"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="hover:text-white transition-all"
            >
              Contact Us
            </button>
          </div>

          {/* Social Links */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center gap-8 text-green-400 text-3xl">
            <Link
              href="https://github.com/momenrefaatahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/momen-refaat-451a2629b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://www.facebook.com/momen.refaat.316937"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
