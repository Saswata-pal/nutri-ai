'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, TrendingUp, Calendar, Award, LogOut, PieChart, Activity, Sparkles, User } from 'lucide-react'
import FoodAnalyzer from '../features/FoodAnalyzer'
import PersonalizedDietPlan from '../features/PersonalizedDietPlan'

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [showDietPlan, setShowDietPlan] = useState(false)

  const stats = [
    { label: 'Meals Tracked', value: '24', icon: Calendar, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
    { label: 'Avg Calories', value: '1,850', icon: TrendingUp, color: 'from-pink-500 to-orange-500', bg: 'from-pink-50 to-orange-50' },
    { label: 'Health Score', value: '8.2/10', icon: Award, color: 'from-orange-500 to-yellow-500', bg: 'from-orange-50 to-yellow-50' },
    { label: 'Streak Days', value: '12', icon: Activity, color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' }
  ]

  if (showAnalyzer) {
    return <FoodAnalyzer onBack={() => setShowAnalyzer(false)} />
  }

  if (showDietPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <button
              onClick={() => setShowDietPlan(false)}
              className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <span className="text-gray-700 group-hover:text-purple-700 font-medium">← Back to Dashboard</span>
            </button>
          </motion.div>
          <PersonalizedDietPlan />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-lg p-2 rounded-xl">
              <span className="text-3xl">🍛</span>
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              NutriAI Dashboard
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 rounded-xl transition-all duration-300 font-semibold border border-white/30"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back! 👋</h2>
          <p className="text-gray-600">Track your nutrition and stay healthy</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50`}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Quick Actions</h3>
              <PieChart className="w-6 h-6 text-orange-500" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowAnalyzer(true)}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-6 py-6 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3">
                  <Camera className="w-6 h-6" />
                  Analyze Food
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </button>

              <button
                onClick={() => setShowDietPlan(true)}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-6 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3">
                  <User className="w-6 h-6" />
                  Get Diet Plan
                  <TrendingUp className="w-5 h-5 animate-pulse" />
                </div>
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Recent Meals</h4>
              <div className="space-y-3">
                {[
                  { name: 'Butter Chicken', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
                  { name: 'Dal Tadka', gradient: 'from-pink-500 to-orange-500', bg: 'from-pink-50 to-orange-50' },
                  { name: 'Biryani', gradient: 'from-orange-500 to-yellow-500', bg: 'from-orange-50 to-yellow-50' }
                ].map((meal, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 bg-gradient-to-r ${meal.bg} rounded-xl hover:shadow-lg transition-all duration-300 border border-white/50`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${meal.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                        {meal.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{meal.name}</p>
                        <p className="text-sm text-gray-500">Today, 12:30 PM</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 bg-white/50 px-3 py-1 rounded-full">438 cal</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-4">Today's Summary</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/90">Calories</span>
                  <span className="font-bold">1,850 / 2,000</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white rounded-full h-3" style={{width: '92%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/90">Protein</span>
                  <span className="font-bold">85g / 100g</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-green-300 rounded-full h-3" style={{width: '85%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/90">Carbs</span>
                  <span className="font-bold">220g / 250g</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-blue-300 rounded-full h-3" style={{width: '88%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/90">Fat</span>
                  <span className="font-bold">55g / 70g</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-yellow-300 rounded-full h-3" style={{width: '78%'}}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-white/90 mb-2">💡 Health Tip</p>
              <p className="text-white font-medium">You're doing great! Keep up the balanced diet.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
