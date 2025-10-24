import {
  SiBootstrap,
  SiCss3,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
// Animation
import BlurText from '@/components/ui/BlurText'
import LogoLoop from '@/components/ui/LogoLoop'
import ProfileCard from '@/components/ui/ProfileCard'
// Animation
const techLogos = [
  {
    node: <SiHtml5 color="#E44D26" />,
    title: 'HTML',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    node: <SiCss3 color="#1572B6" />,
    title: 'CSS',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    node: <SiJavascript color="#F7DF1E" />,
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    node: <SiTypescript color="#3178C6" />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
  },
  {
    node: <SiBootstrap color="#7952B3" />,
    title: 'Bootstrap',
    href: 'https://getbootstrap.com/',
  },
  {
    node: <SiReact color="#61DAFB" />,
    title: 'React',
    href: 'https://react.dev/',
  },
  {
    node: <SiTailwindcss color="#38BDF8" />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
  },
  {
    node: <SiNextdotjs color="#ffffff" />,
    title: 'Next.js',
    href: 'https://nextjs.org/',
  },
  {
    node: <SiGithub color="#181717" />,
    title: 'GitHub',
    href: 'https://github.com/',
  },
]

export default function page() {
  return (
    <div className="container mx-auto" id="about">
      <div>
        <p
          className="text-6xl text-green-400 w-fit mx-auto tracking-widest mb-30"
          style={{ fontFamily: 'Kablammo' }}
        >
          ABOUT ME
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="flex-1 flex flex-col  justify-center lg:items-start items-center">
            <BlurText
              text="Hi! I'm Momen Refaat, an ambitious Front-End Developer living in Egypt I love writing clean, efficient code and building websites using Next.js and Tailwind CSS I'm always striving to improve myself, learn new skills, and create better experiences for users."
              delay={150}
              animateBy="words"
              direction="bottom"
              className="text-3xl sm:text-4xl mb-2 text-white lg:justify-start justify-center"
            />

            <p
              className="text-4xl text-green-400 mt-6 lg:text-start text-center"
              style={{ fontFamily: 'Kablammo' }}
            >
              My Skills
            </p>

            <div
              style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="w-[80%] md:max-w-[700px] max-w-[300px] md:justify-start justify-end"
            >
              <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                
              />
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="glow-wrapper -mt-30">
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
