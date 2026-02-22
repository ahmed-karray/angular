#!/bin/bash

echo "========================================"
echo "   Démarrage du Workshop n°5"
echo "========================================"
echo ""

echo "[1/3] Nettoyage du cache Angular..."
rm -rf .angular
echo "Cache nettoyé!"
echo ""

echo "[2/3] Démarrage de json-server sur le port 3000..."
json-server --watch db.json --port 3000 &
sleep 3
echo ""

echo "[3/3] Démarrage de l'application Angular..."
echo "L'application sera disponible sur http://localhost:4200"
echo ""
ng serve
