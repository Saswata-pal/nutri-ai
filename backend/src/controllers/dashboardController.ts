import { Response } from 'express'
import { prisma } from '../config/database'
import type { AuthRequest } from '../types'

export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    const allMeals = await prisma.meal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    const totalMeals = allMeals.length
    const totalCalories = allMeals.reduce((sum, meal) => sum + meal.calories, 0)
    const avgCalories = totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0
    const totalProtein = allMeals.reduce((sum, meal) => sum + meal.protein, 0)
    const totalCarbs = allMeals.reduce((sum, meal) => sum + meal.carbs, 0)
    const totalFat = allMeals.reduce((sum, meal) => sum + meal.fat, 0)

    const stats = {
      totalMeals,
      totalCalories,
      avgCalories,
      totalProtein: Math.round(totalProtein * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      totalFat: Math.round(totalFat * 10) / 10,
      lastMeal: allMeals[0] || null
    }

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentMeals = allMeals.filter(meal => 
      new Date(meal.createdAt) >= sevenDaysAgo
    ).slice(0, 5)

    const dailyNutrition = calculateDailyNutrition(allMeals.filter(meal => 
      new Date(meal.createdAt) >= sevenDaysAgo
    ))

    const recommendations = generateRecommendations(stats, recentMeals, allMeals)

    const favoriteFoods = await getFavoriteFoods(userId)

    res.json({
      success: true,
      user: {
        name: user!.name,
        email: user!.email,
        joinDate: user!.createdAt
      },
      stats,
      recentMeals,
      dailyNutrition,
      recommendations,
      favoriteFoods
    })

  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
}

const calculateDailyNutrition = (meals: any[]) => {
  const dailyData: any = {}

  meals.forEach(meal => {
    const date = new Date(meal.createdAt).toDateString()
    if (!dailyData[date]) {
      dailyData[date] = {
        date: date,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        meals: 0
      }
    }

    dailyData[date].calories += meal.calories || 0
    dailyData[date].protein += meal.protein || 0
    dailyData[date].carbs += meal.carbs || 0
    dailyData[date].fat += meal.fat || 0
    dailyData[date].fiber += meal.fiber || 0
    dailyData[date].meals += 1
  })

  return Object.values(dailyData)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((day: any) => ({
      ...day,
      calories: Math.round(day.calories),
      protein: Math.round(day.protein * 10) / 10,
      carbs: Math.round(day.carbs * 10) / 10,
      fat: Math.round(day.fat * 10) / 10,
      fiber: Math.round(day.fiber * 10) / 10
    }))
}

const generateRecommendations = (stats: any, recentMeals: any[], allMeals: any[]) => {
  const recommendations: any[] = []

  if (stats.avgCalories > 500) {
    recommendations.push({
      type: 'warning',
      title: 'High Calorie Intake',
      message: 'Consider lighter options like Dal Tadka or Masala Dosa',
      priority: 'high'
    })
  }

  if (stats.totalMeals < 7) {
    recommendations.push({
      type: 'info',
      title: 'Track More Meals',
      message: 'Log more meals to get better nutrition insights',
      priority: 'medium'
    })
  }

  const uniqueFoods = new Set(recentMeals.map(meal => meal.foodName))
  if (uniqueFoods.size < 3 && recentMeals.length >= 3) {
    recommendations.push({
      type: 'info',
      title: 'Add Variety',
      message: 'Try different regional cuisines for balanced nutrition',
      priority: 'low'
    })
  }

  if (stats.totalMeals >= 10) {
    recommendations.push({
      type: 'positive',
      title: 'Great Progress!',
      message: 'You\'re consistently tracking your nutrition journey',
      priority: 'low'
    })
  }

  return recommendations.sort((a, b) => {
    const priorityOrder: any = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

const getFavoriteFoods = async (userId: string) => {
  try {
    const favoriteFoods = await prisma.meal.groupBy({
      by: ['foodId', 'foodName'],
      where: { userId },
      _count: { foodId: true },
      orderBy: { _count: { foodId: 'desc' } },
      take: 5
    })

    return favoriteFoods.map(food => ({
      name: food.foodName,
      count: food._count.foodId
    }))
  } catch (error) {
    console.error('Favorite foods error:', error)
    return []
  }
}

export const getNutritionTrends = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { days = '30' } = req.query

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days as string))

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    })

    const dailyNutrition = calculateDailyNutrition(meals)

    res.json({
      success: true,
      trends: dailyNutrition,
      period: `${days} days`
    })

  } catch (error) {
    console.error('Nutrition trends error:', error)
    res.status(500).json({ error: 'Failed to fetch nutrition trends' })
  }
}