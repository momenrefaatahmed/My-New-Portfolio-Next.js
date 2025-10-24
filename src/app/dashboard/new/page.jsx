'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore'

export default function NewProject() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [difficulty, setDifficulty] = useState('Basic')
  const [technologies, setTechnologies] = useState([])
  const [techName, setTechName] = useState('')
  const [techUrl, setTechUrl] = useState('')
  const [liveDemo, setLiveDemo] = useState('')
  const [githubCode, setGithubCode] = useState('')

  const handleAddTech = () => {
    if (techName && techUrl) {
      setTechnologies([...technologies, { [techName]: techUrl }])
      setTechName('')
      setTechUrl('')
    }
  }

  const handleRemoveTech = (index) => {
    const updated = technologies.filter((_, i) => i !== index)
    setTechnologies(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 1️⃣ جلب جميع المشاريع الموجودة
      const projectsSnapshot = await getDocs(collection(db, 'projects'))
      const projects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // 2️⃣ تحديث order لكل مشروع قديم +1
      const updatePromises = projects.map((project) =>
        updateDoc(doc(db, 'projects', project.id), { order: project.order + 1 })
      )
      await Promise.all(updatePromises)

      // 3️⃣ إضافة المشروع الجديد بـ order = 0
      await addDoc(collection(db, 'projects'), {
        name,
        description,
        image,
        difficulty,
        technologies,
        liveDemo,
        githubCode,
        order: 0,
      })

      alert('✅ Project added successfully!')

      // 4️⃣ إعادة ضبط الفورم
      setName('')
      setDescription('')
      setImage('')
      setTechnologies([])
      setLiveDemo('')
      setGithubCode('')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('❌ Error adding project.')
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Project</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Project Name */}
        <label className="font-semibold">Project Name</label>
        <input
          type="text"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-md"
          required
        />

        {/* Description */}
        <label className="font-semibold">Description</label>
        <textarea
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md"
          required
        />

        {/* Image URL */}
        <label className="font-semibold">Image URL</label>
        <input
          type="text"
          placeholder="Paste project image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border rounded-md"
        />

        {/* Difficulty Level */}
        <label className="font-semibold">Difficulty Level</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option className="text-black">Basic</option>
          <option className="text-black">Intermediate</option>
          <option className="text-black">Advanced</option>
          <option className="text-black">Expert</option>
        </select>

        {/* Live Demo */}
        <label className="font-semibold">Live Demo Link</label>
        <input
          type="url"
          placeholder="https://your-demo-link.com"
          value={liveDemo}
          onChange={(e) => setLiveDemo(e.target.value)}
          className="p-2 border rounded-md"
        />

        {/* GitHub Code */}
        <label className="font-semibold">GitHub Code Link</label>
        <input
          type="url"
          placeholder="https://github.com/username/project"
          value={githubCode}
          onChange={(e) => setGithubCode(e.target.value)}
          className="p-2 border rounded-md"
        />

        {/* Technologies */}
        <label className="font-semibold">Technologies</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Technology name (e.g. React)"
            value={techName}
            onChange={(e) => setTechName(e.target.value)}
            className="p-2 border rounded-md w-1/2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={techUrl}
            onChange={(e) => setTechUrl(e.target.value)}
            className="p-2 border rounded-md w-1/2"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-2">
          {technologies.map((tech, index) => {
            const [techName, techUrl] = Object.entries(tech)[0]
            return (
              <div
                key={index}
                className="flex items-center gap-2 border p-2 rounded-md bg-gray-100 dark:bg-gray-800"
              >
                <img src={techUrl} alt={techName} className="w-6 h-6 object-contain" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{techName}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="text-red-500 hover:text-red-700 ml-2 text-sm font-bold"
                  title="Remove"
                >
                  ❌
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>
    </div>
  )
}
