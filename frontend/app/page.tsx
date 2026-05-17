'use client'
import { useState, useEffect } from 'react'
import Hero from '@/components/features/Hero'
import Dashboard from '@/components/dashboard/Dashboard'
import AuthModal from '@/components/auth/AuthModal'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthSuccess = (token: string) => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <main>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Hero onGetStarted={() => setShowAuthModal(true)} />
      )}
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </main>
  )
}
