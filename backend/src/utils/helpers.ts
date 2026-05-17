import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { FoodData, HealthInsight } from '../types'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: { userId: string; email: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const calculateNutrition = (food: any, portion: number = 1) => {
  return {
    calories: Math.round(food.calories * portion),
    protein: Math.round(food.protein * portion * 10) / 10,
    carbs: Math.round(food.carbs * portion * 10) / 10,
    fat: Math.round(food.fat * portion * 10) / 10,
    fiber: Math.round(food.fiber * portion * 10) / 10,
    sodium: Math.round(food.sodium * portion),
    sugar: Math.round(food.sugar * portion * 10) / 10
  }
}

export const generateHealthInsights = (food: any): HealthInsight[] => {
  const insights: HealthInsight[] = []
  
  if (food.calories < 200) {
    insights.push({ type: 'positive', message: 'Low calorie option - great for weight management' })
  } else if (food.calories > 400) {
    insights.push({ type: 'warning', message: 'High calorie dish - consider portion control' })
  }
  
  if (food.protein > 20) {
    insights.push({ type: 'positive', message: 'Excellent protein source for muscle health' })
  }
  
  if (food.fiber > 8) {
    insights.push({ type: 'positive', message: 'High fiber content supports digestive health' })
  }
  
  if (food.sodium > 600) {
    insights.push({ type: 'warning', message: 'High sodium content - monitor if you have hypertension' })
  }
  
  if (food.healthScore >= 8) {
    insights.push({ type: 'positive', message: 'Nutritionally balanced and healthy choice' })
  } else if (food.healthScore <= 5) {
    insights.push({ type: 'warning', message: 'Consider balancing with healthier options' })
  }
  
  return insights
}

export const parseJsonFields = (food: any): FoodData => {
  return {
    ...food,
    allergens: JSON.parse(food.allergens || '[]'),
    ingredients: JSON.parse(food.ingredients || '[]')
  }
}