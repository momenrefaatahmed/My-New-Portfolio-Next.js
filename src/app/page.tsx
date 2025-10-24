'use client'

// Animation Ui
import Squares from '@/components/ui/Squares '

// Animation Ui

// Components
import About from '@/components/about/About'
import ContactUs from '@/components/contact/ContactUs'
import HomePage from '@/components/home/HomePage'
import Navebar from '@/components/layout/Navebar'
// Components

import { useEffect, useState } from 'react'
import { GoArrowUp } from 'react-icons/go'

import MyProjects from './projects/page'

export default function Home() {
  const [showScroll, setShowScroll] = useState(false)

  // Function to handle scroll visibility
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navebar />

      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none -z-20">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#0ff"
          hoverFillColor="#111"
        />
      </div>

      <HomePage />
      <About />
      <MyProjects />
      <ContactUs />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 bg-green-400 text-black cursor-pointer p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <GoArrowUp />
        </button>
      )}
    </div>
  )
}
