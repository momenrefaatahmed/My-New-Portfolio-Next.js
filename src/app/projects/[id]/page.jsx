'use client'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

// Animation
import Galaxy from '@/components/ui/Galaxy'
// Animation

//Components
import Navbar from '@/components/layout/Navebar'
//Components

// Hooks
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// Hooks

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProject(docSnap.data())
        } else {
          console.log('No such document!')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProject()
  }, [id])

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (!project) return <p className="text-center py-10">Project not found.</p>

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.3}
          glowIntensity={0.6}
          saturation={1}
          hueShift={250}
        />
      </div>

      <Navbar />

      <div className="container mx-auto py-10 px-6 max-w-3xl relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          {project.name}
        </h1>

        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            className="w-full rounded-xl shadow-md mb-6 object-cover"
          />
        )}

        <p className="text-white dark:text-neutral-300 leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {project['See On GitHub'] && (
            <a
              href={project['See On GitHub']}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              View on GitHub
            </a>
          )}
          {project['Live Demo'] && (
            <a
              href={project['Live Demo']}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
            >
              Live Demo
            </a>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-3 dark:text-white">
          Technologies:
        </h2>
        <div className="flex flex-wrap gap-3">
          {Array.isArray(project.technologies) &&
            project.technologies.map((tech, index) => {
              const [techName, techUrl] = Object.entries(tech)[0]
              return (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={techUrl}
                    alt={techName}
                    title={techName}
                    className="w-10 h-10 object-contain rounded-md"
                  />
                  <span className="text-xs mt-1 text-gray-300">{techName}</span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
