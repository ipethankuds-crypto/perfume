@echo off
setlocal
cd /d "C:\Users\losik\OneDrive\Desktop\Perfume\essentials-fragrance-boutique-main"
title Essentials by AK - Live Preview
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to open this preview. Install Node.js from https://nodejs.org then try again.
  pause
  exit /b 1
)
if not exist "node_modules\.bin\vite.cmd" (
  echo Setting up the website for the first time. This may take a few minutes...
  call npm.cmd install --legacy-peer-deps --no-audit --no-fund
  if errorlevel 1 (
    echo Setup could not finish. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo.
echo Opening your website. Saved edits will appear automatically in your browser.
echo Keep this window open while previewing. Press Ctrl+C to stop.
echo.
call npm.cmd run dev -- --host 127.0.0.1 --port 8080 --open
if errorlevel 1 pause
