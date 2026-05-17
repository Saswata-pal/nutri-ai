import { Request, Response } from 'express'
import { generatePersonalizedDietPlan } from '../services/geminiService'

export const getDietPlan = async (req: Request, res: Response) => {
  try {
    const { weight, height, age, gender, activityLevel, goal } = req.body

    if (!weight || !height || !age || !gender) {
      return res.status(400).json({ 
        error: 'Missing required fields: weight, height, age, gender' 
      })
    }

    if (gender !== 'male' && gender !== 'female') {
      return res.status(400).json({ error: 'Gender must be "male" or "female"' })
    }

    const dietPlan = await generatePersonalizedDietPlan({
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
      gender,
      activityLevel: activityLevel || 'moderate',
      goal: goal || 'maintain'
    })

    res.json({
      success: true,
      dietPlan
    })

  } catch (error: any) {
    console.error('Diet plan error:', error)
    res.status(500).json({ 
      error: 'Failed to generate diet plan',
      message: error.message 
    })
  }
}
