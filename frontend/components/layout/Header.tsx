'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, User as UserIcon, LogOut, Camera, BarChart3 } from 'lucide-react'
import type { User } from '../../types'

interface HeaderProps {
  isAuthenticated: boolean
  user: User | null
  onLogin: () => void
  onLogout: () => void
  onDashboard: () => void
}

export default function Header({ isAuthenticated, user, onLogin, onLogout, onDashboard }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.a href="/" className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <span className="text-2xl">🍛</span>
            <span className="text-xl font-bold text-gray-800">FoodAI</span>
          </motion.a>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</a>
            {isAuthenticated && (
              <>
                <button className="text-gray-600 hover:text-primary-500 transition-colors flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  Analyze
                </button>
                <button onClick={onDashboard} className="text-gray-600 hover:text-primary-500 transition-colors flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                <button onClick={onLogout} className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={onLogin} className="btn-primary">Sign In</button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</a>
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                  <button onClick={onLogout} className="flex items-center space-x-2 text-red-500">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button onClick={onLogin} className="btn-primary w-full">Sign In</button>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}