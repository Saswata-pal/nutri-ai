# 🤖 Google Gemini AI Integration Guide

## Step 1: Get Free Gemini API Key

1. Go to: **https://makersuite.google.com/app/apikey**
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy your API key

---

## Step 2: Add API Key to Backend

Edit `backend/.env`:
```bash
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

Replace `YOUR_API_KEY_HERE` with your actual key.

---

## Step 3: Install (Already Done)

The Gemini service is already integrated! Just add your API key.

---

## How It Works

### Flow:
```
1. User uploads food image
   ↓
2. ML model identifies food
   ↓
3. Backend gets nutrition data
   ↓
4. Gemini AI analyzes for THIS specific user
   ↓
5. Returns personalized feedback
```

### Personalized Feedback Includes:
- ✅ Is this food suitable for YOU?
- ✅ Health benefits for YOUR profile
- ✅ Warnings based on YOUR goals
- ✅ Portion recommendation for YOU
- ✅ Best time to eat for YOUR lifestyle

### User Profile Considered:
- Age
- Weight & Height
- Gender
- Activity Level
- Health Goals (weight loss, muscle gain, etc.)
- Allergies
- Dietary preferences

---

## Example Response

```json
{
  "foodName": "Pizza",
  "nutrition": { "calories": 285, "protein": 12, "carbs": 36, "fat": 10 },
  "personalizedFeedback": "For a 25-year-old moderately active person aiming for weight loss, this pizza is moderately suitable. While it provides good protein (12g), the 285 calories and 36g carbs should be consumed mindfully. Benefits: Quick energy, satisfying meal. Concerns: High in refined carbs and sodium. Recommendation: Limit to 1-2 slices, pair with salad. Best time: Lunch (12-2pm) when metabolism is higher. Consider thin crust or veggie toppings for a healthier option."
}
```

---

## Free Tier Limits

- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

More than enough for your app! 🎉

---

## Test It

1. Add your API key to `backend/.env`
2. Restart backend: `npm run dev`
3. Upload food image
4. See personalized feedback! ✨

---

## Status: ✅ READY TO USE

Just add your Gemini API key and it works automatically!
