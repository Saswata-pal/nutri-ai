import axios, { AxiosInstance } from 'axios'
import type { User, Food, Meal, FoodAnalysisResult } from '../types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data: { name: string; email: string; password: string; phone?: string }) => 
    api.post('/api/auth/signup', data),
  verify: (data: { email: string; otp: string }) => 
    api.post('/api/auth/verify', data),
  login: (data: { email: string; password: string }) => 
    api.post<{ success: boolean; user: User; token: string }>('/api/auth/login', data),
}

export const foodAPI = {
  analyze: (formData: FormData) => 
    api.post<{ success: boolean; analysis: FoodAnalysisResult }>('/api/food/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  database: () => 
    api.get<{ success: boolean; foods: Food[] }>('/api/food/database'),
  search: (query: string) => 
    api.get<{ success: boolean; results: Food[] }>('/api/food/search', { params: { q: query } }),
}

export const mealAPI = {
  save: (data: { foodId: number; portion?: number; notes?: string }) => 
    api.post<{ success: boolean; meal: Meal }>('/api/meals', data),
  list: () => 
    api.get<{ success: boolean; meals: Meal[] }>('/api/meals'),
}

export const dashboardAPI = {
  getData: () => 
    api.get('/api/dashboard'),
}

export default api