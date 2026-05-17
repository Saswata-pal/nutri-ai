import express from 'express'
import { saveMeal, getUserMeals, getMealById, updateMeal, deleteMeal } from '../controllers/mealController'
import { validateMeal } from '../middleware/validation'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.use(authenticateToken)

router.post('/', validateMeal, saveMeal)
router.get('/', getUserMeals)
router.get('/:id', getMealById)
router.put('/:id', updateMeal)
router.delete('/:id', deleteMeal)

export default router