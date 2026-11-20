@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starte NOX Bar Server...
start "NOX Bar Server" cmd /k "node server/server.js"
timeout /t 2 >nul
start http://localhost:3000/admin.html
echo.
echo Admin: http://localhost:3000/admin.html
echo Token: nox-admin-2026
echo.
pause
