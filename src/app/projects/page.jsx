'use client'
import { collection, db, getDocs, orderBy, query } from '@/lib/firebase'
import Link from 'next/link'

//Animation
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
//Animation

// Hooks
import { useEffect, useState } from 'react'
// Hooks

export default function Page() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
        const querySnapshot = await getDocs(q)
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4 overflow-hidden" id="projects">
      <p
        className="text-6xl text-green-400 w-fit mx-auto tracking-widest "
        style={{ fontFamily: 'Kablammo' }}
      >
        MY PROJECTS
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <CardContainer key={project.id} className="inter-var">
            <CardBody className="relative group/card rounded-xl p-6 border w-full h-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_2px_rgba(34,211,238,0.2)] transition-all duration-300">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white dark:text-white"
              >
                {project.name}
              </CardItem>

              {project.image && (
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={project.image}
                    height="1000"
                    width="1000"
                    className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={project.name}
                  />
                </CardItem>
              )}

              <CardItem
                as="p"
                translateZ="60"
                className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {project.description}
              </CardItem>

              <div className="flex justify-between items-center mt-8 text-white hover:text-cyan-400">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={`/projects/${project.id}`}
                >
                  Visit Project →
                </CardItem>

                <CardItem
                  translateZ={20}
                  as="div"
                  className="flex gap-2 items-center flex-wrap"
                >
                  {Array.isArray(project.technologies) &&
                    project.technologies.map((tech, index) => {
                      const [techName, techUrl] = Object.entries(tech)[0]
                      return (
                        <img
                          key={index}
                          src={techUrl}
                          alt={techName}
                          title={techName}
                          className="w-6 h-6 object-contain rounded-md hover:scale-110 transition-transform duration-300"
                        />
                      )
                    })}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}
