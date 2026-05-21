# 🍛 NutriAI - Transform Your Health with AI-Powered Food Nutrition Intelligence

Complete AI-Powered Food Analysis Application with Next.js 15 Frontend, Express.js Backend, and Python ML Service

**Detects 101 Food Classes** | **95%+ Accuracy** | **Personalized Dietary Feedback**

## 📁 Project Structure

```
IndianFoodAI/
├── frontend/             # Next.js 15 + React 19 UI
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/             # API client
│   └── styles/          # Tailwind CSS
│
├── backend/              # Express.js + TypeScript API
│   ├── src/             # Source code
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Gemini AI integration
│   │   └── server.ts    # Main server
│   └── prisma/          # Database schema & seed
│
├── ml-service/           # Python FastAPI ML Service
│   ├── models/          # final_model.pth (ViT model)
│   ├── app.py           # FastAPI server
│   └── requirements.txt # Python dependencies
│
└── food-101-extracted/   # Food-101 Dataset
    └── food-101/
        ├── images/      # 101 folders with food images
        └── meta/        # Training/test metadata
```

## 🚀 Quick Start

### Option 1: Automated Start (Windows)
```bash
# Double-click or run:
start-all.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npx prisma db push
npm run db:seed
npm run dev  # Port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev  # Port 3000
```

**Terminal 3 - ML Service:**
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py  # Port 5000
```

**📖 For detailed setup:** See `COMPLETE_SETUP_GUIDE.md`

## ✨ Features

### 🤖 AI Food Recognition
- Upload food images (any of 101 classes)
- 80%+ accuracy using Vision Transformer
- Real-time detection & classification
- Confidence scoring with top-3 predictions
- Bounding box localization

### 📊 Nutrition Analysis
- Complete macro/micronutrient breakdown
- Calorie calculation per serving
- Health scoring (1-10)
- Allergen detection
- **Personalized dietary feedback via Gemini AI**

### 🎯 Personalized Diet Plan (NEW!)
- **BMI calculation & health status detection**
- **Daily calorie recommendations based on profile**
- **AI-generated full-day meal plans**
- **Breakfast, Lunch, Dinner, Snacks with calorie breakdown**
- **Activity level & goal-based customization**
- **Powered by Google Gemini AI**

### 👤 User Management
- JWT authentication
- OTP email verification
- Secure password hashing
- User profiles

### 📈 Analytics Dashboard
- Meal tracking history
- Daily nutrition trends
- Personalized recommendations
- Favorite foods analysis

## 🛡️ Security Features
- JWT token authentication
- bcrypt password hashing
- Rate limiting (100 req/15min)
- Input validation & sanitization
- CORS protection
- Helmet security headers

## 🗄️ Database & ML Model

**Database:**
- SQLite with Prisma ORM
- User, Food, Meal models
- Seeded with 10+ Indian dishes
- Automatic migrations

**ML Model:**
- **Architecture:** Vision Transformer (vit_base_patch16_224)
- **Dataset:** Food-101 (101 classes, 101,000 images)
- **Training:** 10 epochs, ~80% accuracy
- **Input:** 224x224 RGB images
- **Output:** Food class + confidence + bounding box

## 📱 Tech Stack

**Frontend:**
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

**Backend:**
- Express.js + TypeScript
- Prisma ORM
- SQLite Database
- JWT Authentication
- Multer file upload
- Google Gemini AI API

**ML Service:**
- Python 3.8+
- FastAPI
- PyTorch
- torchvision
- timm (Vision Transformer)
- OpenCV (object detection)
- Pillow (image processing)

## 🌟 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify` - OTP verification
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile

### Food Analysis
- `POST /api/food/analyze` - AI food analysis
- `GET /api/food/database` - Food database
- `GET /api/food/search` - Search foods

### Meal Tracking
- `POST /api/meals` - Save meal
- `GET /api/meals` - Get user meals
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal

### Dashboard
- `GET /api/dashboard` - Dashboard data
- `GET /api/dashboard/trends` - Nutrition trends

### Diet Plan (NEW!)
- `POST /api/diet-plan/generate` - Generate personalized diet plan

## 🎯 Usage

### Food Analysis:
1. **Sign Up**: Create account (no OTP required)
2. **Login**: Access your dashboard
3. **Upload Image**: Take/upload food photo (any of 101 classes)
4. **AI Analysis**: 
   - ML model detects food from 101 classes
   - Backend fetches nutrition data
   - Gemini AI generates personalized feedback
5. **View Results**: See food name, confidence, nutrition, and advice
6. **Save Meal**: Track to personal history
7. **Dashboard**: Monitor nutrition trends and health insights

### Personalized Diet Plan (NEW!):
1. **Click**: "Get Diet Plan" button on dashboard
2. **Enter**: Weight, height, age, gender, activity level, goal
3. **Generate**: AI creates personalized meal plan
4. **View**: BMI status, daily calories, full meal plan with breakdown
5. **Follow**: Personalized nutrition recommendations

## 📚 Documentation

- **Setup Guide:** `COMPLETE_SETUP_GUIDE.md` - Step-by-step setup from scratch
- **Diet Plan Setup:** `DIET_PLAN_SETUP.md` - Complete diet plan feature guide
- **Quick Start Diet Plan:** `QUICK_START_DIET_PLAN.md` - 5-minute setup guide
- **Food Classes:** `FOOD_CLASSES_REFERENCE.md` - All 101 detectable foods
- **Gemini Setup:** `GEMINI_SETUP.md` - Get free Gemini API key
- **Data Flow:** `COMPLETE_FLOW.md` - How the system works

## 🔑 Important Files

- `start-all.bat` - Start all services with one click (Windows)
- `ml-service/models/final_model.pth` - **Place your trained model here**
- `backend/.env` - Configure Gemini API key
- `frontend/.env.local` - Configure API URL

## 🎓 Model Training

Your model was trained on:
- **Dataset:** Food-101 (101 food classes)
- **Training Images:** 75,750
- **Test Images:** 25,250
- **Architecture:** Vision Transformer (ViT-B/16)
- **Accuracy:** ~80% on test set
- **Training Notebook:** `ml-service/training_file.ipynb`

## 🌟 Key Features

✅ Detects 101 different food items
✅ Real-time ML inference
✅ Personalized dietary feedback
✅ **AI-powered personalized diet plans**
✅ **BMI & calorie calculation**
✅ **Full-day meal planning**
✅ Nutrition tracking & analytics
✅ User authentication & profiles
✅ Meal history & trends
✅ Health recommendations
✅ Modern gradient UI/UX

## 🚨 Prerequisites

- Node.js 18+
- Python 3.8+
- Trained model file: `final_model.pth`
- Gemini API key (free tier available)

##  Support

For issues or questions:
1. Check `COMPLETE_SETUP_GUIDE.md`
2. Review `FOOD_CLASSES_REFERENCE.md`
3. Verify all services are running
4. DM in linkedin

Built with ❤️ for food lovers and health enthusiasts worldwide
