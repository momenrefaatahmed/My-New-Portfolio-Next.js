'use client'

// Animation
import BlurText from '@/components/ui/BlurText'
import AnimatedContent from '@/components/ui/AnimatedContent'
import Lanyard from '@/components/ui/Lanyard'
import RotatingText from '@/components/ui/RotatingText'
import { Button } from '@/components/ui/moving-border'
// Animation

import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Page() {
  return (
    <div className="container mx-auto px-4 ">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 items-center gap-8 relative">
        <div
          className="flex flex-col lg:col-span-6 col-span-12  lg:items-start items-center  md:text-left"
          style={{ fontFamily: 'BBH Sans Hegarty' }}
        >
          <AnimatedContent
            className="flex justify-center md:justify-start"
            distance={150}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="bounce.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
            config={{ tension: 80, friction: 20 }}
          >
            <div className="flex flex-wrap gap-4 lg:justify-start justify-center">
              <p className="text-3xl sm:text-4xl text-white">Creative</p>
              <RotatingText
                texts={['Coding', 'Components', 'Thinking']}
                mainClassName="px-2 sm:px-3 bg-green-400 text-black overflow-hidden py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>

            <div className="flex flex-col lg:items-start items-center">
              <BlurText
                text="I'm Momen Refaat"
                delay={150}
                animateBy="letters"
                direction="bottom"
                className="text-3xl sm:text-4xl mb-2 text-white"
              />
              <BlurText
                text="Front-End Developer"
                delay={150}
                animateBy="letters"
                direction="bottom"
                className="text-3xl sm:text-4xl  text-green-400"
              />
              <BlurText
                text="I’m a passionate front-end developer from Egypt, skilled in React.js, Next.js, and Tailwind CSS. I build clean, responsive, and user-focused web applications, and I’m always eager to learn new technologies and create engaging digital experiences."
                delay={150}
                animateBy="words"
                direction="top"
                className="text-lg sm:text-2xl text-white lg:justify-start justify-center "
              />
              <div className="flex items-center relative gap-5 mt-5">
                <Link
                  href={'https://www.linkedin.com/in/momen-refaat-451a2629b/'}
                  className="text-4xl hover:text-green-400 transition-all"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  href={'https://github.com/momenrefaatahmed'}
                  className="text-4xl hover:text-green-400 transition-all"
                >
                  <FaGithub />
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1NyhnH_yXEHm_FaQOie3LUOz2OC4iGgjA/view?usp=drive_link"
                  className=" "
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    borderRadius="1.75rem"
                    className="bg-transparent border-green-400 py-3 px-5 text-white cursor-pointer"
                    borderClassName="border-green-400"
                  >
                    My Resume
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>

        <div className="md:col-span-6 hidden lg:flex justify-center items-center order-2 mt-6 md:mt-0">
          <Lanyard />
        </div>
      </div>
    </div>
  )
}
