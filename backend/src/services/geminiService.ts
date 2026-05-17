import axios from 'axios'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

interface UserProfile {
  weight: number
  height: number
  age: number
  gender: 'male' | 'female'
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal?: 'lose' | 'maintain' | 'gain'
}

interface DietPlan {
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

export const calculateBMI = (weight: number, height: number): { bmi: number; category: string; isHealthy: boolean } => {
  const bmi = weight / ((height / 100) ** 2)
  let category = ''
  let isHealthy = false

  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) { category = 'Normal'; isHealthy = true }
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  return { bmi: parseFloat(bmi.toFixed(1)), category, isHealthy }
}

export const calculateDailyCalories = (profile: UserProfile): number => {
  const { weight, height, age, gender, activityLevel = 'moderate', goal = 'maintain' } = profile

  let bmr: number
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  }

  let tdee = bmr * activityMultipliers[activityLevel]

  if (goal === 'lose') tdee -= 500
  else if (goal === 'gain') tdee += 500

  return Math.round(tdee)
}

export const generatePersonalizedDietPlan = async (profile: UserProfile): Promise<DietPlan> => {
  const { bmi, category, isHealthy } = calculateBMI(profile.weight, profile.height)
  const dailyCalories = calculateDailyCalories(profile)

  const calorieBreakdown = {
    breakfast: Math.round(dailyCalories * 0.25),
    lunch: Math.round(dailyCalories * 0.35),
    dinner: Math.round(dailyCalories * 0.30),
    snacks: Math.round(dailyCalories * 0.10)
  }

  try {
    if (!GEMINI_API_KEY) {
      return {
        isHealthyWeight: isHealthy,
        bmi,
        bmiCategory: category,
        dailyCalories,
        mealPlan: {
          breakfast: ['Oatmeal with berries', 'Scrambled eggs', 'Whole wheat toast'],
          lunch: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables'],
          dinner: ['Baked salmon', 'Quinoa', 'Steamed broccoli'],
          snacks: ['Greek yogurt', 'Handful of almonds']
        },
        calorieBreakdown,
        nutritionFeedback: `Your BMI is ${bmi} (${category}). Aim for ${dailyCalories} calories per day.`
      }
    }

    const prompt = `You are a professional nutritionist. Create a personalized full-day meal plan.

User Profile:
- Weight: ${profile.weight}kg
- Height: ${profile.height}cm
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Activity Level: ${profile.activityLevel || 'moderate'}
- Goal: ${profile.goal || 'maintain'} weight
- BMI: ${bmi} (${category})
- Daily Calorie Target: ${dailyCalories} calories

Calorie Distribution:
- Breakfast: ${calorieBreakdown.breakfast} cal
- Lunch: ${calorieBreakdown.lunch} cal
- Dinner: ${calorieBreakdown.dinner} cal
- Snacks: ${calorieBreakdown.snacks} cal

Provide a complete meal plan with 3-4 specific food items for each meal and brief nutrition feedback (3-4 sentences).

Format as JSON:
{
  "breakfast": ["item1", "item2", "item3"],
  "lunch": ["item1", "item2", "item3"],
  "dinner": ["item1", "item2", "item3"],
  "snacks": ["item1", "item2"],
  "feedback": "Your personalized feedback here"
}`

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
    )

    const text = response.data.candidates[0].content.parts[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        isHealthyWeight: isHealthy,
        bmi,
        bmiCategory: category,
        dailyCalories,
        mealPlan: {
          breakfast: parsed.breakfast || [],
          lunch: parsed.lunch || [],
          dinner: parsed.dinner || [],
          snacks: parsed.snacks || []
        },
        calorieBreakdown,
        nutritionFeedback: parsed.feedback || `Your BMI is ${bmi} (${category}). Aim for ${dailyCalories} calories daily.`
      }
    }

    throw new Error('Invalid response')

  } catch (error: any) {
    console.error('Gemini error:', error.response?.data || error.message)
    return {
      isHealthyWeight: isHealthy,
      bmi,
      bmiCategory: category,
      dailyCalories,
      mealPlan: {
        breakfast: ['Oatmeal with berries', 'Scrambled eggs', 'Whole wheat toast'],
        lunch: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables', 'Side salad'],
        dinner: ['Baked salmon', 'Quinoa', 'Steamed broccoli'],
        snacks: ['Greek yogurt', 'Handful of almonds']
      },
      calorieBreakdown,
      nutritionFeedback: `Your BMI is ${bmi} (${category}). ${isHealthy ? 'You have a healthy weight!' : 'Consider adjusting your diet.'} Aim for ${dailyCalories} calories per day to ${profile.goal || 'maintain'} your weight.`
    }
  }
}

export async function generateDietaryFeedback(
  foodName: string,
  nutrition: any,
  userProfile: any
): Promise<string> {
  const prompt = `You are a nutritionist. Analyze this food:

Food: ${foodName}
Calories: ${nutrition.calories}kcal, Protein: ${nutrition.protein}g, Carbs: ${nutrition.carbs}g, Fat: ${nutrition.fat}g

Provide brief feedback (2-3 sentences): Is this healthy? Benefits? Concerns? Recommendations?`

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    )

    return response.data.candidates[0].content.parts[0].text
  } catch (error: any) {
    console.error('Gemini error:', error.response?.data || error.message)
    return `This ${foodName} provides ${nutrition.calories} calories. Enjoy as part of a balanced diet!`
  }
}
