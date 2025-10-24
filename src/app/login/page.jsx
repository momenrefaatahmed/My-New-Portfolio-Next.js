'use client'

import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

//Hooks
import { useRouter } from 'next/navigation'
import { useState } from 'react'
//Hooks

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      if (user.uid === 'vPCJ8Cl4FsT3tpQbyU3G6h7YYo02') {
        router.push('/dashboard')
      } else {
        setError('You are not authorized to access the dashboard.')
      }
    } catch (err) {
      console.error(err)
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
