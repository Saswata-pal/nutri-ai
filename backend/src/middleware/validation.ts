import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    })
  }
  next()
}

export const validateSignup = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
  handleValidationErrors
]

export const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  handleValidationErrors
]

export const validateOTP = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('Valid 6-digit OTP required'),
  handleValidationErrors
]

export const validateMeal = [
  body('foodId').isInt({ min: 1 }).withMessage('Valid food ID required'),
  body('portion').optional().isFloat({ min: 0.1, max: 10 }).withMessage('Portion must be 0.1-10'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes max 500 characters'),
  handleValidationErrors
]