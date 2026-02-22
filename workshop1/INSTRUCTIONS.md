# 🚀 Instructions de lancement du Workshop n°5

## ✅ Toutes les erreurs ont été corrigées !

## Prérequis

- Node.js et npm installés
- Angular CLI installé (`npm install -g @angular/cli`)
- json-server installé (`npm install -g json-server`)

## 🚀 Lancement rapide

### Option 1 : Script automatique (Windows)

```bash
start-project.bat
```

### Option 2 : Script automatique (Linux/Mac)

```bash
chmod +x start-project.sh
./start-project.sh
```

### Option 3 : Lancement manuel

#### 1. Nettoyer le cache Angular (recommandé)

```bash
# Windows
rmdir /s /q .angular

# Linux/Mac
rm -rf .angular
```

#### 2. Installer les dépendances

```bash
npm install
```

#### 3. Lancer le serveur JSON (API REST)

Dans un premier terminal :

```bash
json-server --watch db.json --port 3000
```

Le serveur API sera accessible sur `http://localhost:3000`

#### 4. Lancer l'application Angular

Dans un second terminal :

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 📋 Fonctionnalités implémentées

### ✅ Service de suggestions (HttpClient)

Le service `SuggestionService` utilise HttpClient pour communiquer avec l'API REST :

- `getSuggestionsList()` - Récupérer toutes les suggestions
- `getSuggestionById(id)` - Récupérer une suggestion par ID
- `addSuggestion(suggestion)` - Ajouter une nouvelle suggestion
- `updateSuggestion(id, suggestion)` - Mettre à jour une suggestion
- `deleteSuggestion(id)` - Supprimer une suggestion

### ✅ Gestion des erreurs

- Retry automatique (2 tentatives) pour les requêtes GET
- Gestion centralisée des erreurs avec `catchError`
- Messages d'erreur utilisateur-friendly

### ✅ Composants

1. **ListSuggestionComponent** - Liste des suggestions avec recherche
2. **SuggestionFormComponent** - Formulaire d'ajout avec validation
3. **SuggestionDetailsComponent** - Affichage des détails d'une suggestion

### ✅ Routing

- `/suggestions` - Liste des suggestions
- `/suggestions/create` - Formulaire d'ajout
- `/suggestions/:id` - Détails d'une suggestion

## 🧪 Tester les fonctionnalités

1. **Afficher la liste** : Accédez à `http://localhost:4200/suggestions`
2. **Ajouter une suggestion** : Cliquez sur "Ajouter une suggestion"
3. **Voir les détails** : Cliquez sur "Détails" sur une carte
4. **Liker une suggestion** : Cliquez sur le bouton "👍"
5. **Rechercher** : Utilisez la barre de recherche

## 📁 Structure du projet

```
src/app/
├── core/
│   └── Services/
│       └── suggestion.service.ts    # Service avec HttpClient
├── features/
│   └── suggestions/
│       ├── list-suggestion/         # Liste des suggestions
│       ├── suggestion-form/         # Formulaire d'ajout
│       └── suggestion-details/      # Détails d'une suggestion
└── models/
    └── suggestion.ts                # Interface Suggestion
```

## 🔧 API REST (json-server)

L'API REST est disponible sur `http://localhost:3000` avec les endpoints suivants :

- `GET /suggestions` - Liste toutes les suggestions
- `GET /suggestions/:id` - Récupère une suggestion par ID
- `POST /suggestions` - Crée une nouvelle suggestion
- `PUT /suggestions/:id` - Met à jour une suggestion
- `DELETE /suggestions/:id` - Supprime une suggestion

## 📝 Données de test

Le fichier `db.json` contient 4 suggestions de test avec différents statuts :
- Acceptée
- Refusée
- En attente

Vous pouvez modifier ce fichier pour ajouter vos propres données de test.
