@echo off
echo ============================================
echo   Fantasy Telecom - Server Setup & Start
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js is NOT installed on this computer.
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download the LTS version (recommended)
    echo 3. Install it and restart this script
    echo.
    echo Opening Node.js download page...
    start https://nodejs.org/en/download
    pause
    exit /b 1
)

echo [✓] Node.js found:
node --version
echo.

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo [*] Installing dependencies (first time only)...
    npm install
    if %errorlevel% neq 0 (
        echo [!] Failed to install dependencies. Please check your internet connection.
        pause
        exit /b 1
    )
    echo [✓] Dependencies installed!
    echo.
)

echo [*] Starting Fantasy Telecom server...
echo.
echo ============================================
echo   Website: http://localhost:3000
echo   Admin:   http://localhost:3000/admin.html
echo ============================================
echo.
echo Press Ctrl+C to stop the server.
echo.

node server.js

pause
