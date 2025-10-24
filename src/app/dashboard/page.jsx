'use client'

import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  const ADMIN_UID = 'vPCJ8Cl4FsT3tpQbyU3G6h7YYo02'

  // Check user
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

  // sort Order
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Delet Projects
  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المشروع؟')) {
      try {
        await deleteDoc(doc(db, 'projects', id))
        setProjects((prev) => prev.filter((project) => project.id !== id))
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  // LogOut
  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="flex gap-4">
            <Link
              href="/dashboard/new"
              className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-500 transition"
            >
              ➕ Add New Project
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-neutral-900 p-4 rounded-xl shadow-md flex flex-col justify-between"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-lg mb-4 w-full h-40 object-cover"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex justify-between">
                <Link
                  href={`/dashboard/edit/${project.id}`}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            لا توجد مشاريع حالياً
          </p>
        )}
      </div>
    </div>
  )
}
