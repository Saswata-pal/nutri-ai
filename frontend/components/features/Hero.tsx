'use client'
import { motion } from 'framer-motion'
import { Camera, Utensils, BarChart3, Users, Sparkles, Heart, Target, LucideIcon } from 'lucide-react'

interface HeroProps {
  onGetStarted: () => void
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  bgColor: string
}

export default function Hero({ onGetStarted }: HeroProps) {
  const features: Feature[] = [
    {
      icon: Camera,
      title: 'AI Food Recognition',
      description: 'Upload food images and get instant identification of 500+ Indian dishes',
      gradient: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50'
    },
    {
      icon: Utensils,
      title: 'Nutrition Analysis',
      description: 'Detailed breakdown of calories, proteins, carbs, and micronutrients',
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    {
      icon: BarChart3,
      title: 'Health Insights',
      description: 'Personalized recommendations based on your dietary goals',
      gradient: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50'
    },
    {
      icon: Users,
      title: 'Meal Tracking',
      description: 'Track your daily nutrition and monitor your health journey',
      gradient: 'from-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50'
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-300 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-red-300 rounded-full animate-float"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 px-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-8xl animate-bounce-gentle">🍛</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent text-shadow-lg">
              NutriAI
            </span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Transform Your Health with AI-Powered
            </span>
            <br />
            <span className="text-orange-600">
              Indian Food Nutrition Intelligence
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Snap a photo of any Indian dish and instantly discover its
            <span className="font-bold text-orange-600"> complete nutritional profile</span>,
            <span className="font-bold text-green-600"> health insights</span>, and
            <span className="font-bold text-blue-600"> personalized recommendations</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button onClick={onGetStarted} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-glow transition-all duration-300 flex items-center gap-3">
                <Camera className="w-6 h-6" />
                Get Started Free
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </button>
            
            <a href="#features" className="group relative">
              <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-green-50 hover:border-green-300 transition-all duration-300 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Learn More
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        id="features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-24 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Why Choose 
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                NutriAI?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of nutrition tracking with our AI-powered platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className={`relative ${feature.bgColor} p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 text-center h-full`}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Target className="w-5 h-5 text-orange-500 mx-auto" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full animate-float"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-white mb-6 text-shadow-lg">
              Trusted by Food Enthusiasts
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of users discovering their nutrition journey with AI precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { number: '500+', label: 'Indian Dishes', icon: '🍛' },
              { number: '95%', label: 'Accuracy Rate', icon: '🎯' },
              { number: '10K+', label: 'Happy Users', icon: '❤️' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-2xl">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-6xl font-bold text-white mb-3 text-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-xl text-white/90 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 bg-green-300 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-emerald-300 rounded-full animate-float"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <span className="text-6xl animate-bounce-gentle">🚀</span>
          </div>
          
          <h2 className="text-5xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Ready to Start Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Nutrition Journey?
            </span>
          </h2>
          
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
            Upload your first food image and discover detailed nutrition insights with 
            <span className="font-bold text-green-600"> AI precision</span>
          </p>
          
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-glow-green transition-all duration-300 flex items-center gap-3">
              <Sparkles className="w-6 h-6 animate-pulse" />
              Sign Up Now - It's Free!
              <span className="text-2xl animate-bounce-gentle">🎉</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
