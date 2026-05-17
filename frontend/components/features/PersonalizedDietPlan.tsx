'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Activity, Target, Loader2, Sparkles, TrendingUp, Apple, Coffee, Utensils, Cookie } from 'lucide-react'

interface DietPlanResult {
  isHealthyWeight: boolean
  bmi: number
  bmiCategory: string
  dailyCalories: number
  mealPlan: {
    breakfast: string[]
    lunch: string[]
    dinner: string[]
    snacks: string[]
  }
  calorieBreakdown: {
    breakfast: number
    lunch: number
    dinner: number
    snacks: number
  }
  nutritionFeedback: string
}

export default function PersonalizedDietPlan() {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DietPlanResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8000/api/diet-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate diet plan')
      }

      setResult(data.dietPlan)
    } catch (err: any) {
      setError(err.message || 'Failed to generate diet plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get Your Personalized Diet Plan
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                required
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g., 70"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Height (cm) *
              </label>
              <input
                type="number"
                required
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g., 170"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Age (years) *
              </label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g., 25"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Activity className="w-4 h-4 inline mr-1" />
                Activity Level
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="very_active">Very Active (athlete)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Diet Plan
                  <TrendingUp className="w-5 h-5" />
                </>
              )}
            </div>
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-700 font-medium"
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`bg-gradient-to-br ${
                result.isHealthyWeight
                  ? 'from-green-50 to-emerald-50 border-green-200'
                  : 'from-orange-50 to-red-50 border-orange-200'
              } p-6 rounded-2xl border-2`}
            >
              <h3 className="text-sm font-bold text-gray-600 mb-2">BMI Status</h3>
              <div className={`text-3xl font-bold ${
                result.isHealthyWeight ? 'text-green-600' : 'text-orange-600'
              }`}>
                {result.bmi}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                {result.bmiCategory}
              </div>
              <div className="mt-2 text-xs font-medium">
                {result.isHealthyWeight ? '✅ Healthy Weight' : '⚠️ Needs Attention'}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200"
            >
              <h3 className="text-sm font-bold text-gray-600 mb-2">Daily Calories</h3>
              <div className="text-3xl font-bold text-blue-600">
                {result.dailyCalories}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                kcal/day
              </div>
              <div className="mt-2 text-xs font-medium text-blue-600">
                🎯 Target Intake
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200"
            >
              <h3 className="text-sm font-bold text-gray-600 mb-2">Goal</h3>
              <div className="text-2xl font-bold text-purple-600 capitalize">
                {formData.goal} Weight
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                {formData.activityLevel.replace('_', ' ')}
              </div>
              <div className="mt-2 text-xs font-medium text-purple-600">
                💪 Stay Consistent
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200"
          >
            <h3 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Personalized Nutrition Feedback
            </h3>
            <p className="text-gray-800 leading-relaxed">{result.nutritionFeedback}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-orange-700">
                  Breakfast ({result.calorieBreakdown.breakfast} kcal)
                </h3>
              </div>
              <ul className="space-y-2">
                {result.mealPlan.breakfast.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">
                  Lunch ({result.calorieBreakdown.lunch} kcal)
                </h3>
              </div>
              <ul className="space-y-2">
                {result.mealPlan.lunch.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Apple className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-700">
                  Dinner ({result.calorieBreakdown.dinner} kcal)
                </h3>
              </div>
              <ul className="space-y-2">
                {result.mealPlan.dinner.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-700">
                  Snacks ({result.calorieBreakdown.snacks} kcal)
                </h3>
              </div>
              <ul className="space-y-2">
                {result.mealPlan.snacks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
