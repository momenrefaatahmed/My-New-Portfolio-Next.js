import React from 'react'

interface SplashToggleProps {
  splashEnabled: boolean
  setSplashEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SplashToggle({ splashEnabled, setSplashEnabled }: SplashToggleProps) {
  return (
    <button
      onClick={() => setSplashEnabled(prev => !prev)}
      className="ml-4 py-2 px-4 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all"
    >
      {splashEnabled ? 'Cursor On' : 'Cursor Off'}
    </button>
  )
}
