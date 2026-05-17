export interface User {
  id: string
  name: string
  email: string
  phone?: string
  verified: boolean
  joinDate: string
}

export interface Food {
  id: number
  name: string
  category: string
  region: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
  allergens: string[]
  healthScore: number
  servingSize: string
  ingredients: string[]
}

export interface Meal {
  id: string
  userId: string
  foodId: number
  foodName: string
  portion: number
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  notes?: string
  category: string
  region: string
  createdAt: string
}

export interface FoodAnalysisResult {
  foodId: number
  foodName: string
  confidence: number
  category: string
  region: string
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sodium: number
    sugar: number
  }
  healthScore: number
  servingSize: string
  allergens: string[]
  ingredients: string[]
  insights: HealthInsight[]
}

export interface HealthInsight {
  type: 'positive' | 'warning' | 'info'
  message: string
}

export interface DashboardStats {
  totalMeals: number
  totalCalories: number
  avgCalories: number
  totalProtein: number
}

export interface DailyNutrition {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  meals: number
}

export interface Recommendation {
  type: 'positive' | 'warning' | 'info'
  title: string
  message: string
  priority: 'high' | 'medium' | 'low'
}