@echo off
title Node.js Server Management
cd /d "%~dp0"

:menu
cls
echo ================================
echo       Node.js Server Menu
echo ================================
echo [0] Fix SQLite3 (Cross-Platform Issue)
echo [1] Install Dependencies
echo [2] Start Server
echo [3] Exit
echo ================================
set /p choice="Enter your choice: "

if "%choice%"=="0" goto fix_sqlite
if "%choice%"=="1" goto install_deps
if "%choice%"=="2" goto start_server
if "%choice%"=="3" exit

echo Invalid choice! Try again.
pause
goto menu

:fix_sqlite
cls
echo Removing SQLite3...
npm uninstall sqlite3

echo Cleaning NPM cache...
npm cache clean --force

echo Reinstalling SQLite3 (Fixing cross-platform issues)...
npm install sqlite3 --build-from-source=false

echo Optional Cleanup...
rmdir /s /q node_modules
del package-lock.json

echo Done! Returning to menu...
pause
goto menu

:install_deps
cls
echo Installing dependencies...
npm install

echo Done! Returning to menu...
pause
goto menu

:start_server
cls
echo Starting server...
node app.js

echo Server stopped. Press any key to return to the menu.
pause
goto menu
