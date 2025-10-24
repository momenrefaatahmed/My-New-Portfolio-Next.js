'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function EditProjectPage() {
  const router = useRouter()
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [project, setProject] = useState({
    name: '',
    description: '',
    image: '',
    technologies: '',
    github: '',
    liveDemo: '',
    order: 0, 
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const ADMIN_UID = 'vPCJ8Cl4FsT3tpQbyU3G6h7YYo02'

  // ✅ Check Admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.uid === ADMIN_UID) {
        setUser(currentUser)
      } else {
        router.push('/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  // 📥 Get Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setProject({
            ...data,
            technologies: JSON.stringify(data.technologies || [], null, 2),
            github: data['See On GitHub'] || '',
            liveDemo: data['Live Demo'] || '',
            order: data.order || 0, 
          })
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

  
  const handleChange = (e) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  
  const handleSave = async () => {
    setSaving(true)
    try {
      const docRef = doc(db, 'projects', id)
      await updateDoc(docRef, {
        ...project,
        'See On GitHub': project.github,
        'Live Demo': project.liveDemo,
        order: Number(project.order), 
        technologies: JSON.parse(project.technologies || '[]'),
      })
      alert('✅ Project updated successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('❌ Error updating project!')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-3xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Project</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 font-semibold">Project Name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={project.image}
              onChange={handleChange}
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Technologies (JSON)</label>
            <textarea
              name="technologies"
              value={project.technologies}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700 font-mono text-sm"
            />
            <p className="text-gray-400 text-sm mt-1">
              مثال: [{'{'}"React": "react_icon_url"{'}'}, {'{'}"Firebase": "firebase_icon_url"{'}'}]
            </p>
          </div>

          <div>
            <label className="block mb-2 font-semibold">GitHub Link</label>
            <input
              type="text"
              name="github"
              value={project.github}
              onChange={handleChange}
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Live Demo Link</label>
            <input
              type="text"
              name="liveDemo"
              value={project.liveDemo}
              onChange={handleChange}
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Project Order</label>
            <input
              type="number"
              name="order"
              value={project.order}
              onChange={handleChange}
              className="w-full p-3 rounded bg-neutral-800 text-white border border-gray-700"
              min="0"
            />
            <p className="text-gray-400 text-sm mt-1">
              رقم أصغر = يظهر أولاً في الصفحة
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 bg-green-600 hover:bg-green-500 transition py-3 rounded-md font-bold"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-2 bg-gray-700 hover:bg-gray-600 transition py-2 rounded-md"
          >
            🔙 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
