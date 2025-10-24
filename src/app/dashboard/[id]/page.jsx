'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function EditProjectPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    difficulty: '',
    technologies: '',
    github: '',
    liveDemo: ''
  })

  // Get Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setFormData({
            name: data.name || '',
            description: data.description || '',
            image: data.image || '',
            difficulty: data['Difficulty level'] || '',
            technologies: Array.isArray(data.technologies)
              ? data.technologies.join(', ')
              : '',
            github: data['See On GitHub'] || '',
            liveDemo: data['Live Demo'] || ''
          })
        } else {
          alert('Project not found!')
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProject()
  }, [id, router])

  // 🔹 Refrsh Firestore
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const docRef = doc(db, 'projects', id)
      const techArray = formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

      await updateDoc(docRef, {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        'Difficulty level': formData.difficulty,
        'See On GitHub': formData.github,
        'Live Demo': formData.liveDemo,
        technologies: techArray
      })

      alert('✅ Project updated successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('❌ Failed to update project.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading)
    return <p className="text-center py-10 text-white">Loading project...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-green-400 mb-4">
          Edit Project
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white h-28"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Project Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty Level"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma-separated)"
          value={formData.technologies}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={formData.github}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
        />

        <input
          type="text"
          name="liveDemo"
          placeholder="Live Demo Link"
          value={formData.liveDemo}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-all"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
