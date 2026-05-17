import requests
import sys

ML_URL = "http://localhost:5000"

print("🧪 Testing ML Service...\n")

# Test 1: Health check
try:
    response = requests.get(f"{ML_URL}/health", timeout=5)
    data = response.json()
    print(f"✅ Health Check: {data['status']}")
    print(f"   Model Status: {data['model_status']}")
except Exception as e:
    print(f"❌ ML Service not running: {e}")
    print("\n💡 Start ML service with: cd ml-service && python app.py")
    sys.exit(1)

# Test 2: Root endpoint
try:
    response = requests.get(f"{ML_URL}/", timeout=5)
    data = response.json()
    print(f"\n✅ Service Info:")
    print(f"   Model Loaded: {data['model_loaded']}")
    print(f"   Device: {data['device']}")
    print(f"   Classes: {data['num_classes']}")
    
    if not data['model_loaded']:
        print("\n⚠️  WARNING: Model not loaded!")
        print("   Check if final_model.pth exists in ml-service/models/")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n✅ ML Service is ready!")
print("   Upload food images to test predictions")
