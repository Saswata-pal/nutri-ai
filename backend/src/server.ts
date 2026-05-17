import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/authRoutes'
import foodRoutes from './routes/foodRoutes'
import mealRoutes from './routes/mealRoutes'
import dashboardRoutes from './routes/dashboardRoutes'
import dietPlanRoutes from './routes/dietPlanRoutes'

const app = express()
const PORT = process.env.PORT || 8000

app.use(helmet())
app.use(compression())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later' }
})
app.use('/api/', limiter)

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/meals', mealRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/diet-plan', dietPlanRoutes)

app.get('/', (req, res) => {
  res.json({
    message: '🍛 NutriAI Backend API',
    version: '1.0.0',
    description: 'Transform Your Health with AI-Powered Indian Food Nutrition Intelligence',
    endpoints: {
      auth: '/api/auth',
      food: '/api/food',
      meals: '/api/meals',
      dashboard: '/api/dashboard',
      dietPlan: '/api/diet-plan',
      health: '/health'
    }
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  })
})

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', error)
  
  if (error.code === 'P2002') {
    return res.status(409).json({
      error: 'Duplicate entry',
      message: 'A record with this data already exists'
    })
  }
  
  if (error.code === 'P2025') {
    return res.status(404).json({
      error: 'Record not found',
      message: 'The requested record does not exist'
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      message: error.message
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Please provide a valid authentication token'
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      message: 'Please login again'
    })
  }

  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 NutriAI Backend Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`)
  console.log(`📊 Health Check: http://localhost:${PORT}/health`)
  console.log(`📚 API Documentation: http://localhost:${PORT}/`)
})

export default app