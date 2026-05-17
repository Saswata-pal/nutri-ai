import express from 'express'
import { getDietPlan } from '../controllers/dietPlanController'

const router = express.Router()

router.post('/generate', getDietPlan)

export default router
