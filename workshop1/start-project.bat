@echo off
echo ========================================
echo   Demarrage du Workshop n5
echo ========================================
echo.

echo [1/3] Nettoyage du cache Angular...
rmdir /s /q .angular 2>nul
echo Cache nettoye!
echo.

echo [2/3] Demarrage de json-server sur le port 3000...
start "JSON Server" cmd /k "json-server --watch db.json --port 3000"
timeout /t 3 >nul
echo.

echo [3/3] Demarrage de l'application Angular...
echo L'application sera disponible sur http://localhost:4200
echo.
ng serve

pause
