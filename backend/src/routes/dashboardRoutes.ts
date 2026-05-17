import express from 'express'
import { getDashboardData, getNutritionTrends } from '../controllers/dashboardController'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.use(authenticateToken)

router.get('/', getDashboardData)
router.get('/trends', getNutritionTrends)

export default router