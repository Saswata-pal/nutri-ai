@echo off
echo ========================================
echo DIAGNOSTIC CHECK
echo ========================================
echo.

echo [1/3] Checking ML Service...
curl -s http://localhost:5000/health
echo.
echo.

echo [2/3] Checking Backend...
curl -s http://localhost:8000/api/food/database?limit=5
echo.
echo.

echo [3/3] Checking Frontend...
curl -s http://localhost:3000
echo.
echo.

echo ========================================
echo If you see errors above:
echo - ML Service error = Start: cd ml-service ^&^& python app.py
echo - Backend error = Start: cd backend ^&^& npm run dev
echo - Frontend error = Start: cd frontend ^&^& npm run dev
echo ========================================
pause
