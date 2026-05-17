import { Response } from 'express'
import { prisma } from '../config/database'
import { calculateNutrition } from '../utils/helpers'
import type { AuthRequest } from '../types'

export const saveMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId, portion = 1, notes } = req.body
    const userId = req.user!.id

    const food = await prisma.food.findUnique({
      where: { id: parseInt(foodId) }
    })

    if (!food) {
      return res.status(404).json({ error: 'Food not found' })
    }

    const nutrition = calculateNutrition(food, portion)

    const meal = await prisma.meal.create({
      data: {
        userId,
        foodId: parseInt(foodId),
        foodName: food.name,
        portion: parseFloat(portion),
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
        fiber: nutrition.fiber,
        notes: notes || '',
        category: food.category,
        region: food.region
      }
    })

    res.status(201).json({
      success: true,
      message: 'Meal saved successfully',
      meal
    })

  } catch (error) {
    console.error('Meal creation error:', error)
    res.status(500).json({ error: 'Failed to save meal' })
  }
}

export const getUserMeals = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '20', startDate, endDate } = req.query
    const userId = req.user!.id

    const where: any = { userId }
    
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate as string)
      if (endDate) where.createdAt.lte = new Date(endDate as string)
    }

    const meals = await prisma.meal.findMany({
      where,
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
      include: {
        food: {
          select: {
            name: true,
            category: true,
            region: true,
            healthScore: true
          }
        }
      }
    })

    const total = await prisma.meal.count({ where })

    res.json({
      success: true,
      meals,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    })

  } catch (error) {
    console.error('Meals fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch meals' })
  }
}

export const getMealById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const meal = await prisma.meal.findFirst({
      where: { id, userId },
      include: {
        food: true
      }
    })

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' })
    }

    res.json({
      success: true,
      meal
    })

  } catch (error) {
    console.error('Meal fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch meal' })
  }
}

export const updateMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { portion, notes } = req.body
    const userId = req.user!.id

    const existingMeal = await prisma.meal.findFirst({
      where: { id, userId },
      include: { food: true }
    })

    if (!existingMeal) {
      return res.status(404).json({ error: 'Meal not found' })
    }

    const updateData: any = {}
    
    if (portion !== undefined) {
      const nutrition = calculateNutrition(existingMeal.food, portion)
      updateData.portion = parseFloat(portion)
      updateData.calories = nutrition.calories
      updateData.protein = nutrition.protein
      updateData.carbs = nutrition.carbs
      updateData.fat = nutrition.fat
      updateData.fiber = nutrition.fiber
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    const meal = await prisma.meal.update({
      where: { id },
      data: updateData
    })

    res.json({
      success: true,
      message: 'Meal updated successfully',
      meal
    })

  } catch (error) {
    console.error('Meal update error:', error)
    res.status(500).json({ error: 'Failed to update meal' })
  }
}

export const deleteMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const meal = await prisma.meal.findFirst({
      where: { id, userId }
    })

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' })
    }

    await prisma.meal.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    })

  } catch (error) {
    console.error('Meal deletion error:', error)
    res.status(500).json({ error: 'Failed to delete meal' })
  }
}