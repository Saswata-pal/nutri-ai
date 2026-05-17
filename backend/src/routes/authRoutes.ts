import express from 'express'
import { signup, verifyOTP, login, getProfile } from '../controllers/authController'
import { validateSignup, validateLogin, validateOTP } from '../middleware/validation'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.post('/signup', validateSignup, signup)
router.post('/verify', validateOTP, verifyOTP)
router.post('/login', validateLogin, login)
router.get('/profile', authenticateToken, getProfile)

export default router