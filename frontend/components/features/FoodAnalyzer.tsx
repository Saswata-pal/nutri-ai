'use client'
import { useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Loader2, CheckCircle, AlertCircle, Save, ArrowLeft, Sparkles } from 'lucide-react'

interface FoodAnalyzerProps {
  onBack: () => void
}

interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
}

interface HealthInsight {
  type: 'warning' | 'positive' | 'info'
  message: string
}

interface AnalysisResult {
  foodName: string
  confidence: number
  category: string
  region: string
  nutrition: NutritionData
  healthScore: number
  servingSize: string
  allergens: string[]
  ingredients: string[]
  insights: HealthInsight[]
}

export default function FoodAnalyzer({ onBack }: FoodAnalyzerProps) {
  const [image, setImage] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setResult(null)
      setError('')
    }
  }

  const analyzeFood = async () => {
    if (!image) return
    
    setAnalyzing(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('image', image)
      
      const response = await fetch('http://localhost:8000/api/food/analyze', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Failed to analyze food')
      }
      
      const data = await response.json()
      
      if (data.success && data.analysis) {
        setResult({
          foodName: data.analysis.foodName,
          confidence: data.analysis.confidence,
          category: data.analysis.category,
          region: data.analysis.region,
          nutrition: data.analysis.nutrition,
          healthScore: data.analysis.healthScore,
          servingSize: data.analysis.servingSize,
          allergens: data.analysis.allergens || [],
          ingredients: data.analysis.ingredients || [],
          insights: data.analysis.insights || []
        })
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze food. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-700 group-hover:text-blue-700 font-medium">Back</span>
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-4xl font-display font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🍛 AI Food Analyzer
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Upload an image of Indian food to get detailed nutrition analysis
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/50"
        >
          <div className="border-3 border-dashed border-blue-300 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full animate-float"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce-gentle"></div>
            </div>
            
            {image ? (
              <div className="space-y-6 relative z-10">
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={URL.createObjectURL(image)} 
                  alt="Food" 
                  className="max-w-sm mx-auto rounded-2xl shadow-2xl"
                />
                <p className="text-sm text-gray-600 font-medium">{image.name}</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={analyzeFood}
                    disabled={analyzing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3 hover:shadow-glow transition-all duration-300">
                      {analyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing Magic...
                        </>
                      ) : (
                        <>
                          <Camera className="w-5 h-5" />
                          Analyze Food
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </>
                      )}
                    </div>
                  </motion.button>
                  
                  <button
                    onClick={() => setImage(null)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium text-gray-700"
                  >
                    Choose Different Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Upload className="w-20 h-20 text-blue-400 mx-auto" />
                </motion.div>
                <div>
                  <label className="cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-glow transition-all duration-300 inline-block group-hover:scale-105">
                      Choose Image
                    </div>
                  </label>
                </div>
                <p className="text-gray-500">
                  Supports JPG, PNG, WebP formats (Max 5MB)
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-500" />
            <span className="text-red-700 font-medium">{error}</span>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Analysis Complete
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                  <h4 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                    {result.foodName}
                    <span className="text-lg">🍽️</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Category:</span>
                      <span className="text-gray-800">{result.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Region:</span>
                      <span className="text-gray-800">{result.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Confidence:</span>
                      <span className="text-green-600 font-bold">{result.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Health Score:</span>
                      <span className={`font-bold ${
                        result.healthScore >= 8 ? 'text-green-600' :
                        result.healthScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.healthScore}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-2xl border border-red-200">
                    <h5 className="font-bold mb-3 text-red-700 flex items-center gap-2">
                      ⚠️ Allergens
                    </h5>
                    {result.allergens.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {result.allergens.map((allergen, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600 font-medium">No common allergens ✅</span>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                    <h5 className="font-bold mb-3 text-green-700 flex items-center gap-2">
                      🥘 Main Ingredients
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.ingredients.slice(0, 5).map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                    📊 Nutrition Facts
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-100 p-4 rounded-xl text-center border border-orange-200">
                      <div className="text-sm font-medium text-orange-600">Calories</div>
                      <div className="text-2xl font-bold text-orange-700">{result.nutrition.calories}</div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl text-center border border-green-200">
                      <div className="text-sm font-medium text-green-600">Protein</div>
                      <div className="text-2xl font-bold text-green-700">{result.nutrition.protein}g</div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-xl text-center border border-blue-200">
                      <div className="text-sm font-medium text-blue-600">Carbs</div>
                      <div className="text-2xl font-bold text-blue-700">{result.nutrition.carbs}g</div>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-xl text-center border border-yellow-200">
                      <div className="text-sm font-medium text-yellow-600">Fat</div>
                      <div className="text-2xl font-bold text-yellow-700">{result.nutrition.fat}g</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg">
                      <span className="text-gray-600">Fiber:</span>
                      <span className="font-bold text-gray-800">{result.nutrition.fiber}g</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg">
                      <span className="text-gray-600">Sodium:</span>
                      <span className="font-bold text-gray-800">{result.nutrition.sodium}mg</span>
                    </div>
                  </div>
                </div>

                {result.insights && result.insights.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                    <h4 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                      💡 Health Insights
                    </h4>
                    <div className="space-y-3">
                      {result.insights.map((insight, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border ${
                            insight.type === 'positive' ? 'bg-green-50 text-green-800 border-green-200' :
                            insight.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                            'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          <span className="font-medium">{insight.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-glow-green transition-all duration-300 flex items-center gap-3">
                  <Save className="w-5 h-5" />
                  Save to Meal History
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
