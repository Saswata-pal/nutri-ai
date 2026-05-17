import { Request, Response } from 'express'
import { prisma } from '../config/database'
import { generateHealthInsights, parseJsonFields } from '../utils/helpers'
import type { AuthRequest } from '../types'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000'

// Smart nutrition defaults
const getSmartNutrition = (foodName: string) => {
  const name = foodName.toLowerCase()
  
  if (name.includes('cake') || name.includes('pie') || name.includes('ice_cream') || name.includes('donut')) {
    return { calories: 350, protein: 4, carbs: 50, fat: 15, fiber: 2, sugar: 30, sodium: 200, healthScore: 4, servingSize: '1 serving' }
  }
  if (name.includes('salad')) {
    return { calories: 150, protein: 8, carbs: 15, fat: 6, fiber: 5, sugar: 4, sodium: 300, healthScore: 9, servingSize: '1 bowl' }
  }
  if (name.includes('steak') || name.includes('chicken') || name.includes('beef') || name.includes('pork')) {
    return { calories: 400, protein: 35, carbs: 10, fat: 25, fiber: 1, sugar: 2, sodium: 500, healthScore: 7, servingSize: '1 serving' }
  }
  if (name.includes('fish') || name.includes('salmon') || name.includes('sushi') || name.includes('shrimp')) {
    return { calories: 300, protein: 30, carbs: 8, fat: 15, fiber: 0, sugar: 1, sodium: 400, healthScore: 9, servingSize: '1 serving' }
  }
  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('lasagna')) {
    return { calories: 400, protein: 15, carbs: 60, fat: 12, fiber: 4, sugar: 6, sodium: 600, healthScore: 6, servingSize: '1 plate' }
  }
  if (name.includes('pizza')) {
    return { calories: 450, protein: 18, carbs: 50, fat: 18, fiber: 3, sugar: 5, sodium: 800, healthScore: 5, servingSize: '2 slices' }
  }
  
  return { calories: 250, protein: 12, carbs: 35, fat: 8, fiber: 3, sugar: 5, sodium: 300, healthScore: 7, servingSize: '1 serving' }
}

const analyzeFood = async (filePath: string) => {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  
  const response = await axios.post(`${ML_SERVICE_URL}/predict`, formData, {
    headers: formData.getHeaders(),
    timeout: 30000
  })
  
  return response.data
}

export const analyzeFoodImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' })
    }

    console.log('📸 Analyzing food image...')
    console.log('🔗 ML Service URL:', ML_SERVICE_URL)
    console.log('📁 Image path:', req.file.path)

    // Step 1: ML Detection
    const mlResult = await analyzeFood(req.file.path)
    console.log('🤖 ML Result:', JSON.stringify(mlResult, null, 2))
    
    if (!mlResult.success) {
      throw new Error('ML service failed to analyze image')
    }
    
    const foodName = mlResult.classification.food_name.replace(/_/g, ' ')
    const confidence = Math.round(mlResult.classification.confidence)
    
    console.log(`✅ ML detected: ${foodName} (${confidence}% confidence)`)

    // Step 2: Get nutrition from database or use smart defaults
    let food = await prisma.food.findFirst({ 
      where: { 
        name: foodName
      } 
    })
    
    if (!food) {
      console.log(`⚠️ Food "${foodName}" not in database, using smart defaults`)
      const nutrition = getSmartNutrition(foodName)
      food = {
        id: 0,
        name: foodName,
        category: 'General',
        region: 'International',
        ...nutrition,
        allergens: '[]',
        ingredients: '[]',
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    const parsedFood = parseJsonFields(food)
    const healthInsights = generateHealthInsights(parsedFood)

    // Step 3: Generate personalized feedback with Gemini AI
    let personalizedFeedback = `This ${foodName} contains ${food.calories} calories. Enjoy as part of a balanced diet!`
    
    try {
      const { generateDietaryFeedback } = await import('../services/geminiService')
      const user = req.user ? await prisma.user.findUnique({ where: { id: req.user.userId } }) : null
      
      if (user && process.env.GEMINI_API_KEY) {
        console.log('🧠 Generating personalized feedback with Gemini AI...')
        personalizedFeedback = await generateDietaryFeedback(
          foodName,
          {
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            fiber: food.fiber,
            sodium: food.sodium
          },
          user
        )
        console.log('✅ Personalized feedback generated')
      }
    } catch (geminiError) {
      console.error('Gemini error:', geminiError)
    }

    // Clean up file
    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    // Step 4: Return complete analysis
    res.json({
      success: true,
      analysis: {
        foodId: food.id,
        foodName: food.name,
        confidence: confidence,
        category: food.category,
        region: food.region || 'International',
        detection: mlResult.detection,
        nutrition: {
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          fiber: food.fiber,
          sodium: food.sodium,
          sugar: food.sugar
        },
        healthScore: food.healthScore,
        servingSize: food.servingSize,
        allergens: parsedFood.allergens,
        ingredients: parsedFood.ingredients,
        insights: healthInsights,
        topPredictions: mlResult.classification.top_predictions || [],
        personalizedFeedback: personalizedFeedback
      }
    })

    console.log('✅ Complete analysis sent to frontend')

  } catch (error: any) {
    console.error('❌ Food analysis error:', error)
    
    // Clean up file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    
    const errorMessage = error.response?.data?.detail || error.message || 'Failed to analyze food image'
    res.status(500).json({ 
      error: errorMessage,
      hint: errorMessage.includes('Model not loaded') 
        ? 'Please ensure final_model.pth exists in ml-service/models/ directory and restart ML service'
        : 'Check if ML service is running on port 5000'
    })
  }
}

export const getFoodDatabase = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20', category, region } = req.query
    
    const where: any = {}
    if (category) where.category = { contains: category as string, mode: 'insensitive' }
    if (region) where.region = { contains: region as string, mode: 'insensitive' }

    const foods = await prisma.food.findMany({
      where,
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      orderBy: { name: 'asc' }
    })

    const total = await prisma.food.count({ where })
    const parsedFoods = foods.map(parseJsonFields)

    res.json({
      success: true,
      foods: parsedFoods,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    })

  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Failed to fetch food database' })
  }
}

export const searchFood = async (req: Request, res: Response) => {
  try {
    const { q: query, limit = '10' } = req.query

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' })
    }

    const foods = await prisma.food.findMany({
      where: {
        OR: [
          { name: { contains: query as string, mode: 'insensitive' } },
          { category: { contains: query as string, mode: 'insensitive' } },
          { region: { contains: query as string, mode: 'insensitive' } }
        ]
      },
      take: parseInt(limit as string),
      orderBy: { name: 'asc' }
    })

    const parsedFoods = foods.map(parseJsonFields)

    res.json({
      success: true,
      query,
      count: parsedFoods.length,
      results: parsedFoods
    })

  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Failed to search food database' })
  }
}

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const food = await prisma.food.findUnique({
      where: { id: parseInt(id) }
    })

    if (!food) {
      return res.status(404).json({ error: 'Food not found' })
    }

    const parsedFood = parseJsonFields(food)
    const healthInsights = generateHealthInsights(parsedFood)

    res.json({
      success: true,
      food: {
        ...parsedFood,
        insights: healthInsights
      }
    })

  } catch (error) {
    console.error('Food fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch food details' })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.food.findMany({
      select: { category: true },
      distinct: ['category']
    })

    const regions = await prisma.food.findMany({
      select: { region: true },
      distinct: ['region']
    })

    res.json({
      success: true,
      categories: categories.map(c => c.category),
      regions: regions.map(r => r.region)
    })

  } catch (error) {
    console.error('Categories error:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}
