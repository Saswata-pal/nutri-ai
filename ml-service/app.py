from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

import io
import numpy as np
import cv2
from typing import Dict, List
import os
import torch
import torchvision.transforms as transforms
from PIL import Image
import timm

# =========================
# Model Configuration
# =========================

MODEL_PATH = "models/final_model.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# =========================
# Food Classes
# =========================

FOOD_CLASSES = [
    "apple_pie", "baby_back_ribs", "baklava", "beef_carpaccio", "beef_tartare",
    "beet_salad", "beignets", "bibimbap", "bread_pudding", "breakfast_burrito",
    "bruschetta", "caesar_salad", "cannoli", "caprese_salad", "carrot_cake",
    "ceviche", "cheese_plate", "cheesecake", "chicken_curry", "chicken_quesadilla",
    "chicken_wings", "chocolate_cake", "chocolate_mousse", "churros", "clam_chowder",
    "club_sandwich", "crab_cakes", "creme_brulee", "croque_madame", "cup_cakes",
    "deviled_eggs", "donuts", "dumplings", "edamame", "eggs_benedict",
    "escargots", "falafel", "filet_mignon", "fish_and_chips", "foie_gras",
    "french_fries", "french_onion_soup", "french_toast", "fried_calamari", "fried_rice",
    "frozen_yogurt", "garlic_bread", "gnocchi", "greek_salad", "grilled_cheese_sandwich",
    "grilled_salmon", "guacamole", "gyoza", "hamburger", "hot_and_sour_soup",
    "hot_dog", "huevos_rancheros", "hummus", "ice_cream", "lasagna",
    "lobster_bisque", "lobster_roll_sandwich", "macaroni_and_cheese", "macarons", "miso_soup",
    "mussels", "nachos", "omelette", "onion_rings", "oysters",
    "pad_thai", "paella", "pancakes", "panna_cotta", "peking_duck",
    "pho", "pizza", "pork_chop", "poutine", "prime_rib",
    "pulled_pork_sandwich", "ramen", "ravioli", "red_velvet_cake", "risotto",
    "samosa", "sashimi", "scallops", "seaweed_salad", "shrimp_and_grits",
    "spaghetti_bolognese", "spaghetti_carbonara", "spring_rolls", "steak", "strawberry_shortcake",
    "sushi", "tacos", "takoyaki", "tiramisu", "tuna_tartare",
    "waffles"
]

# =========================
# Image Transform
# =========================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# =========================
# Global Model Variable
# =========================

model = None

# =========================
# Load Model
# =========================

def load_model():
    global model

    try:
        if os.path.exists(MODEL_PATH):

            # Create ViT model
            model = timm.create_model(
                "vit_base_patch16_224",
                pretrained=False,
                num_classes=101
            )

            # Load trained weights
            model.load_state_dict(
                torch.load(MODEL_PATH, map_location=DEVICE)
            )

            model = model.to(DEVICE)
            model.eval()

            print(f"✅ Model loaded successfully from {MODEL_PATH}")

        else:
            print(f"⚠️ Model not found at {MODEL_PATH}")
            model = None

    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None

# =========================
# Lifespan Handler
# =========================

@asynccontextmanager
async def lifespan(app: FastAPI):

    # Startup
    load_model()

    yield

    # Shutdown
    print("🛑 NutriAI ML Service stopped")

# =========================
# FastAPI App
# =========================

app = FastAPI(
    title="NutriAI ML Service",
    version="1.0.0",
    lifespan=lifespan
)

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Root Route
# =========================

@app.get("/")
async def root():

    return {
        "service": "NutriAI ML Service",
        "status": "running",
        "model_loaded": model is not None,
        "device": str(DEVICE),
        "num_classes": len(FOOD_CLASSES)
    }

# =========================
# Health Route
# =========================

@app.get("/health")
async def health():

    return {
        "status": "healthy",
        "model_status": "loaded" if model is not None else "not_loaded"
    }

# =========================
# Detection Function
# =========================

def detect_and_localize(image: Image.Image) -> Dict:

    img_array = np.array(image)

    gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)

    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    edges = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    if contours:

        largest_contour = max(contours, key=cv2.contourArea)

        x, y, w, h = cv2.boundingRect(largest_contour)

        height, width = img_array.shape[:2]

        bbox = {
            "x": int(x),
            "y": int(y),
            "width": int(w),
            "height": int(h),
            "x_norm": round(x / width, 4),
            "y_norm": round(y / height, 4),
            "width_norm": round(w / width, 4),
            "height_norm": round(h / height, 4)
        }

    else:

        height, width = img_array.shape[:2]

        bbox = {
            "x": 0,
            "y": 0,
            "width": width,
            "height": height,
            "x_norm": 0.0,
            "y_norm": 0.0,
            "width_norm": 1.0,
            "height_norm": 1.0
        }

    return bbox

# =========================
# Classification Function
# =========================

def classify_food(image: Image.Image) -> Dict:

    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Ensure final_model.pth exists."
        )

    img_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():

        outputs = model(img_tensor)

        probabilities = torch.nn.functional.softmax(outputs, dim=1)

        confidence, predicted = torch.max(probabilities, 1)

        # Top 3 Predictions
        top3_prob, top3_idx = torch.topk(probabilities, 3)

        top_predictions = []

        for i in range(3):

            idx = top3_idx[0][i].item()

            prob = top3_prob[0][i].item()

            if idx < len(FOOD_CLASSES):

                top_predictions.append({
                    "name": FOOD_CLASSES[idx],
                    "confidence": round(prob * 100, 2)
                })

        predicted_idx = predicted.item()

        if predicted_idx >= len(FOOD_CLASSES):
            predicted_idx = 0

        return {
            "food_id": predicted_idx + 1,
            "food_name": FOOD_CLASSES[predicted_idx],
            "confidence": round(confidence.item() * 100, 2),
            "top_predictions": top_predictions
        }

# =========================
# Predict Endpoint
# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        # Detection
        bbox = detect_and_localize(image)

        # Classification
        classification = classify_food(image)

        result = {
            "success": True,

            "detection": {
                "bounding_box": bbox,
                "detected": True
            },

            "classification": classification,

            "image_info": {
                "width": image.width,
                "height": image.height,
                "format": image.format or "JPEG"
            }
        }

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

# =========================
# Batch Prediction Endpoint
# =========================

@app.post("/batch-predict")
async def batch_predict(files: List[UploadFile] = File(...)):

    results = []

    for file in files:

        try:

            result = await predict(file)

            results.append(result)

        except Exception as e:

            results.append({
                "success": False,
                "error": str(e),
                "filename": file.filename
            })

    return {
        "success": True,
        "results": results,
        "total": len(results)
    }

# =========================
# Run Server
# =========================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5000
    )