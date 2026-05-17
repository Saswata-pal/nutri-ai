# 🤖 NutriAI ML Service

Python FastAPI service for food detection and classification using PyTorch.

## Setup

1. **Place your model:**
   ```
   Copy final_model.pth to ml-service/models/final_model.pth
   ```

2. **Install dependencies:**
   ```bash
   cd ml-service
   pip install -r requirements.txt
   ```

3. **Run service:**
   ```bash
   python app.py
   ```
   Service runs on: http://localhost:5000

## API Endpoints

### POST /predict
Upload single image for analysis
```bash
curl -X POST -F "file=@food.jpg" http://localhost:5000/predict
```

Response:
```json
{
  "success": true,
  "detection": {
    "bounding_box": {
      "x": 100, "y": 50, "width": 300, "height": 400,
      "x_norm": 0.25, "y_norm": 0.125, "width_norm": 0.75, "height_norm": 1.0
    },
    "detected": true
  },
  "classification": {
    "food_id": 1,
    "food_name": "Butter Chicken",
    "confidence": 94.5,
    "top_predictions": [
      {"name": "Butter Chicken", "confidence": 94.5},
      {"name": "Chicken Tikka", "confidence": 3.2},
      {"name": "Tandoori Chicken", "confidence": 1.8}
    ]
  }
}
```

### POST /batch-predict
Upload multiple images

### GET /health
Check service health

## Features

✅ Object Detection - Locates food in image
✅ Object Localization - Returns bounding boxes
✅ Classification - Identifies food type
✅ Confidence Scores - Returns prediction confidence
✅ Top-3 Predictions - Shows alternative predictions
✅ Batch Processing - Handle multiple images
✅ GPU Support - Automatic CUDA detection
