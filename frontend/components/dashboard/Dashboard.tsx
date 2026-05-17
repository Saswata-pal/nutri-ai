'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Camera,
  TrendingUp,
  Calendar,
  Award,
  LogOut,
  PieChart,
  Activity,
  Sparkles,
  User
} from 'lucide-react'

import FoodAnalyzer from '../features/FoodAnalyzer'
import PersonalizedDietPlan from '../features/PersonalizedDietPlan'

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {

  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [showDietPlan, setShowDietPlan] = useState(false)

  const stats = [
    {
      label: 'Meals Tracked',
      value: '24',
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
      bg: 'from-purple-50 to-pink-50'
    },
    {
      label: 'Avg Calories',
      value: '1,850',
      icon: TrendingUp,
      color: 'from-pink-500 to-orange-500',
      bg: 'from-pink-50 to-orange-50'
    },
    {
      label: 'Health Score',
      value: '8.2/10',
      icon: Award,
      color: 'from-orange-500 to-yellow-500',
      bg: 'from-orange-50 to-yellow-50'
    },
    {
      label: 'Streak Days',
      value: '12',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      bg: 'from-green-50 to-emerald-50'
    }
  ]

  // =========================
  // Food Analyzer Screen
  // =========================

  if (showAnalyzer) {
    return <FoodAnalyzer onBack={() => setShowAnalyzer(false)} />
  }

  // =========================
  // Diet Plan Screen
  // =========================

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
              className="group flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <span className="text-gray-700 group-hover:text-purple-700 font-medium">
                ← Back to Dashboard
              </span>
            </button>
          </motion.div>

          <PersonalizedDietPlan />

        </div>
      </div>
    )
  }

  // =========================
  // Main Dashboard
  // =========================

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">

      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>

      </div>

      {/* Navbar */}

      <nav className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 shadow-2xl">

        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="bg-white/20 backdrop-blur-lg p-2 rounded-2xl shadow-lg">
              <span className="text-3xl">🍛</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-lg">
              NutriAI Dashboard
            </h1>

          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 rounded-2xl transition-all duration-300 font-semibold border border-white/30 hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

        </div>

      </nav>

      {/* Main Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        {/* Welcome Section */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h2 className="text-4xl font-black text-gray-800 mb-3">
            Welcome back 👋
          </h2>

          <p className="text-gray-600 text-lg mb-4">
            Track your nutrition and stay healthy with AI-powered insights
          </p>

          {/* AI Badge */}

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg">

            <Sparkles className="w-4 h-4" />

            AI Nutrition Assistant Active

          </div>

        </motion.div>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {stats.map((stat, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                y: -8,
                rotate: 1
              }}
              className={`bg-gradient-to-br ${stat.bg} backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50`}
            >

              <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>

                <stat.icon className="w-7 h-7 text-white" />

              </div>

              <p className="text-gray-600 text-sm font-semibold mb-1">
                {stat.label}
              </p>

              <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>

            </motion.div>

          ))}

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Section */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40"
          >

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-black text-gray-800">
                Quick Actions
              </h3>

              <PieChart className="w-6 h-6 text-orange-500" />

            </div>

            {/* Action Buttons */}

            <div className="grid md:grid-cols-2 gap-5">

              {/* Analyze Food */}

              <button
                onClick={() => setShowAnalyzer(true)}
                className="group relative"
              >

                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-6 py-6 rounded-3xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3">

                  <Camera className="w-6 h-6" />

                  Analyze Food

                  <Sparkles className="w-5 h-5 animate-pulse" />

                </div>

              </button>

              {/* Diet Plan */}

              <button
                onClick={() => setShowDietPlan(true)}
                className="group relative"
              >

                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-6 rounded-3xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3">

                  <User className="w-6 h-6" />

                  Get Diet Plan

                  <TrendingUp className="w-5 h-5 animate-pulse" />

                </div>

              </button>

            </div>

            {/* Recent Meals */}

            <div className="mt-10">

              <h4 className="text-xl font-bold text-gray-700 mb-5">
                Recent Meals
              </h4>

              <div className="space-y-4">

                {[
                  {
                    name: 'Butter Chicken',
                    gradient: 'from-purple-500 to-pink-500',
                    bg: 'from-purple-50 to-pink-50'
                  },
                  {
                    name: 'Dal Tadka',
                    gradient: 'from-pink-500 to-orange-500',
                    bg: 'from-pink-50 to-orange-50'
                  },
                  {
                    name: 'Biryani',
                    gradient: 'from-orange-500 to-yellow-500',
                    bg: 'from-orange-50 to-yellow-50'
                  }
                ].map((meal, i) => (

                  <div
                    key={i}
                    className={`group flex items-center justify-between p-4 bg-gradient-to-r ${meal.bg} rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50`}
                  >

                    <div className="flex items-center gap-3">

                      <div className={`w-12 h-12 bg-gradient-to-r ${meal.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}>

                        {meal.name[0]}

                      </div>

                      <div>

                        <p className="font-bold text-gray-800">
                          {meal.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Today, 12:30 PM
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-bold text-gray-700 bg-white/50 px-3 py-1 rounded-full">
                      438 cal
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* AI Insights */}

            <div className="mt-10">

              <h4 className="text-xl font-bold text-gray-700 mb-5">
                AI Insights
              </h4>

              <div className="space-y-4">

                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border border-white/50 shadow-md">

                  <p className="font-semibold text-gray-800">
                    Protein intake improved by 12% this week 📈
                  </p>

                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 border border-white/50 shadow-md">

                  <p className="font-semibold text-gray-800">
                    Consider reducing fried foods for better nutrition 🍟
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* Right Sidebar */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white border border-white/20"
          >

            <h3 className="text-2xl font-black mb-6">
              Today's Summary
            </h3>

            <div className="space-y-6">

              {/* Calories */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white/90">Calories</span>

                  <span className="font-bold">
                    1,850 / 2,000
                  </span>

                </div>

                <div className="w-full bg-white/20 rounded-full h-3">

                  <div
                    className="bg-white rounded-full h-3"
                    style={{ width: '92%' }}
                  ></div>

                </div>

              </div>

              {/* Protein */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white/90">Protein</span>

                  <span className="font-bold">
                    85g / 100g
                  </span>

                </div>

                <div className="w-full bg-white/20 rounded-full h-3">

                  <div
                    className="bg-green-300 rounded-full h-3"
                    style={{ width: '85%' }}
                  ></div>

                </div>

              </div>

              {/* Carbs */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white/90">Carbs</span>

                  <span className="font-bold">
                    220g / 250g
                  </span>

                </div>

                <div className="w-full bg-white/20 rounded-full h-3">

                  <div
                    className="bg-blue-300 rounded-full h-3"
                    style={{ width: '88%' }}
                  ></div>

                </div>

              </div>

              {/* Fat */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white/90">Fat</span>

                  <span className="font-bold">
                    55g / 70g
                  </span>

                </div>

                <div className="w-full bg-white/20 rounded-full h-3">

                  <div
                    className="bg-yellow-300 rounded-full h-3"
                    style={{ width: '78%' }}
                  ></div>

                </div>

              </div>

            </div>

            {/* Health Tip */}

            <div className="mt-8 p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">

              <p className="text-sm text-white/90 mb-2">
                💡 Health Tip
              </p>

              <p className="text-white font-medium">
                You're doing great! Keep maintaining a balanced diet and hydration.
              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  )
}