import express from 'express'
import { analyzeFoodImage, getFoodDatabase, searchFood, getFoodById, getCategories } from '../controllers/foodController'
import { upload, handleUploadError } from '../middleware/upload'
import { optionalAuth } from '../middleware/auth'

const router = express.Router()

router.post('/analyze', optionalAuth, upload.single('image'), handleUploadError, analyzeFoodImage)
router.get('/database', getFoodDatabase)
router.get('/search', searchFood)
router.get('/categories', getCategories)
router.get('/:id', getFoodById)

export default router