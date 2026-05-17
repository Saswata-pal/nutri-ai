@echo off
echo ========================================
echo   NutriAI - Starting All Services
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed!
    echo Please install Python from https://python.org/
    pause
    exit /b 1
)

echo [1/3] Starting Backend Server (Port 8000)...
start "NutriAI Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 >nul

echo [2/3] Starting Frontend Server (Port 3000)...
start "NutriAI Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 >nul

echo [3/3] Starting ML Service (Port 5000)...
start "NutriAI ML Service" cmd /k "cd ml-service && venv\Scripts\activate && python app.py"
timeout /t 3 >nul

echo.
echo ========================================
echo   All Services Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo ML Service: http://localhost:5000
echo.
echo Press any key to open the app in browser...
pause >nul

start http://localhost:3000

echo.
echo To stop all services, close all terminal windows.
echo.
pause
