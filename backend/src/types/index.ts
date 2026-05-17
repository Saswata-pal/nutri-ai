import { Request } from 'express'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    verified: boolean
  }
}

export interface FoodData {
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

export interface HealthInsight {
  type: 'positive' | 'warning' | 'info'
  message: string
}