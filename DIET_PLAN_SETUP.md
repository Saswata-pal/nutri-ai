# 🎯 Personalized Diet Plan Setup Guide

## Overview
This feature provides AI-powered personalized diet plans using Google's Gemini API. It calculates BMI, determines healthy weight status, calculates daily calorie needs, and generates a complete meal plan with nutrition feedback.

## ✨ Features
- ✅ BMI calculation and health status detection
- ✅ Daily calorie calculation based on Mifflin-St Jeor equation
- ✅ Personalized meal plans (Breakfast, Lunch, Dinner, Snacks)
- ✅ Calorie breakdown per meal
- ✅ Activity level and goal-based recommendations
- ✅ AI-powered nutrition feedback via Gemini

## 🔑 Step 1: Get Your FREE Gemini API Key

### Option A: Google AI Studio (Recommended - Free)

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - OR: https://aistudio.google.com/app/apikey

2. **Sign in with Google Account**
   - Use any Gmail account
   - No credit card required

3. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" (or use existing project)
   - Copy the generated API key (starts with `AIza...`)

4. **Important Notes**
   - Free tier: 60 requests per minute
   - No cost for basic usage
   - Keep your API key secure

### Option B: Google Cloud Console (Alternative)

1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Generative Language API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

## 🛠️ Step 2: Configure Backend

### 1. Add API Key to Backend `.env`

Navigate to: `IndianFoodAI/backend/.env`

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-for-foodai-backend-2024"
JWT_EXPIRES_IN="7d"
PORT=8000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
ML_SERVICE_URL="http://localhost:5000"
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

**Replace** `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your actual Gemini API key.

### 2. Verify Backend Files

Ensure these files exist (already created):
- ✅ `backend/src/controllers/dietPlanController.ts`
- ✅ `backend/src/routes/dietPlanRoutes.ts`
- ✅ `backend/src/services/geminiService.ts` (updated)
- ✅ `backend/src/server.ts` (updated with diet plan routes)

## 🎨 Step 3: Verify Frontend Files

Ensure these files exist (already created):
- ✅ `frontend/components/features/PersonalizedDietPlan.tsx`
- ✅ `frontend/components/dashboard/Dashboard.tsx` (updated)

## 🚀 Step 4: Start All Services

### Option 1: Automated Start (Windows)
```bash
# From project root
start-all.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Should start on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Should start on http://localhost:3000
```

**Terminal 3 - ML Service:**
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
# OR: source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app.py
# Should start on http://localhost:5000
```

## 📱 Step 5: Using the Feature

### 1. Access the Application
- Open browser: http://localhost:3000
- Sign up / Login to your account

### 2. Navigate to Diet Plan
- From Dashboard, click **"Get Diet Plan"** button
- You'll see a form with personal information fields

### 3. Fill in Your Details
- **Weight (kg)**: Your current weight (e.g., 70)
- **Height (cm)**: Your height (e.g., 170)
- **Age (years)**: Your age (e.g., 25)
- **Gender**: Male or Female
- **Activity Level**: 
  - Sedentary (little/no exercise)
  - Light (1-3 days/week)
  - Moderate (3-5 days/week)
  - Active (6-7 days/week)
  - Very Active (athlete)
- **Goal**:
  - Lose Weight (-500 cal/day)
  - Maintain Weight (maintenance)
  - Gain Weight (+500 cal/day)

### 4. Generate Your Plan
- Click **"Generate My Diet Plan"**
- Wait 3-5 seconds for AI processing
- View your personalized results!

## 📊 What You'll Get

### 1. Health Metrics
- **BMI**: Your Body Mass Index
- **BMI Category**: Underweight / Normal / Overweight / Obese
- **Health Status**: Whether your weight is healthy
- **Daily Calories**: Personalized calorie target

### 2. Meal Plan
- **Breakfast**: 3-4 food items with calorie allocation (25%)
- **Lunch**: 3-4 food items with calorie allocation (35%)
- **Dinner**: 3-4 food items with calorie allocation (30%)
- **Snacks**: 2-3 food items with calorie allocation (10%)

### 3. AI Feedback
- Personalized nutrition advice
- Health recommendations
- Tips based on your profile

## 🔧 Troubleshooting

### Issue 1: "Failed to generate diet plan"
**Solution:**
- Check if Gemini API key is correctly set in `backend/.env`
- Verify API key is valid at https://aistudio.google.com/app/apikey
- Ensure backend server is running on port 8000

### Issue 2: Backend not starting
**Solution:**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Issue 3: API Key Invalid
**Solution:**
- Generate a new API key from Google AI Studio
- Make sure there are no extra spaces in `.env` file
- Restart backend server after updating `.env`

### Issue 4: No AI feedback (using fallback)
**Solution:**
- This is normal if API key is not set
- System will use default meal plans
- Add Gemini API key for AI-powered plans

## 🧪 Testing the API Directly

### Test with cURL:
```bash
curl -X POST http://localhost:8000/api/diet-plan/generate \
  -H "Content-Type: application/json" \
  -d "{\"weight\":70,\"height\":170,\"age\":25,\"gender\":\"male\",\"activityLevel\":\"moderate\",\"goal\":\"maintain\"}"
```

### Test with Postman:
- **URL**: `http://localhost:8000/api/diet-plan/generate`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "weight": 70,
  "height": 170,
  "age": 25,
  "gender": "male",
  "activityLevel": "moderate",
  "goal": "maintain"
}
```

## 📈 How It Works (Flow)

```
User Input (Frontend)
    ↓
POST /api/diet-plan/generate (Backend)
    ↓
Calculate BMI & Daily Calories (geminiService.ts)
    ↓
Generate Prompt for Gemini AI
    ↓
Call Gemini API (Google AI Studio)
    ↓
Parse AI Response (JSON meal plan)
    ↓
Return Complete Diet Plan (Frontend)
    ↓
Display Results with Beautiful UI
```

## 🎯 BMI Calculation Formula

```
BMI = weight (kg) / (height (m))²

Categories:
- < 18.5: Underweight
- 18.5 - 24.9: Normal (Healthy)
- 25.0 - 29.9: Overweight
- ≥ 30.0: Obese
```

## 🔥 Daily Calorie Calculation (Mifflin-St Jeor)

### Basal Metabolic Rate (BMR):
**Men**: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5
**Women**: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161

### Total Daily Energy Expenditure (TDEE):
- Sedentary: BMR × 1.2
- Light: BMR × 1.375
- Moderate: BMR × 1.55
- Active: BMR × 1.725
- Very Active: BMR × 1.9

### Goal Adjustment:
- Lose Weight: TDEE - 500 cal
- Maintain: TDEE
- Gain Weight: TDEE + 500 cal

## 🌟 API Endpoints

### Diet Plan Generation
```
POST /api/diet-plan/generate
Content-Type: application/json

Request Body:
{
  "weight": 70,        // Required: kg
  "height": 170,       // Required: cm
  "age": 25,          // Required: years
  "gender": "male",   // Required: "male" or "female"
  "activityLevel": "moderate",  // Optional: default "moderate"
  "goal": "maintain"  // Optional: default "maintain"
}

Response:
{
  "success": true,
  "dietPlan": {
    "isHealthyWeight": true,
    "bmi": 24.2,
    "bmiCategory": "Normal",
    "dailyCalories": 2400,
    "mealPlan": {
      "breakfast": ["Oatmeal with berries", "Scrambled eggs", "Whole wheat toast"],
      "lunch": ["Grilled chicken breast", "Brown rice", "Mixed vegetables"],
      "dinner": ["Baked salmon", "Quinoa", "Steamed broccoli"],
      "snacks": ["Greek yogurt", "Handful of almonds"]
    },
    "calorieBreakdown": {
      "breakfast": 600,
      "lunch": 840,
      "dinner": 720,
      "snacks": 240
    },
    "nutritionFeedback": "Your BMI is 24.2 (Normal). You have a healthy weight! Aim for 2400 calories per day..."
  }
}
```

## 🎨 UI Components

### PersonalizedDietPlan Component
- **Location**: `frontend/components/features/PersonalizedDietPlan.tsx`
- **Features**:
  - Responsive form with validation
  - Beautiful gradient cards
  - Animated results display
  - Meal-specific icons and colors
  - Loading states with animations

### Dashboard Integration
- **Location**: `frontend/components/dashboard/Dashboard.tsx`
- **Access**: "Get Diet Plan" button on dashboard
- **Navigation**: Back button to return to dashboard

## 🔒 Security Notes

1. **Never commit API keys** to version control
2. Keep `.env` file in `.gitignore`
3. Use environment variables for sensitive data
4. Regenerate API key if accidentally exposed
5. Monitor API usage in Google AI Studio

## 📚 Additional Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **Google AI Studio**: https://aistudio.google.com/
- **BMI Calculator**: https://www.cdc.gov/bmi/
- **Nutrition Guidelines**: https://www.who.int/nutrition

## ✅ Checklist

Before using the feature, ensure:
- [ ] Gemini API key obtained from Google AI Studio
- [ ] API key added to `backend/.env`
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] ML service running on port 5000
- [ ] User logged in to the application
- [ ] All npm packages installed

## 🎉 Success!

You're now ready to use the Personalized Diet Plan feature! Users can:
- Get instant BMI and health status
- Receive personalized calorie targets
- View AI-generated meal plans
- Get nutrition feedback tailored to their profile

Built with ❤️ using Google Gemini AI
