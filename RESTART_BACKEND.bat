@echo off
echo ========================================
echo Restarting Backend Server
echo ========================================
echo.

cd backend

echo Installing dependencies...
call npm install

echo.
echo Starting backend server...
call npm run dev

pause
