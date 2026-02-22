# Workshop n°5 - Les Services Angular

Application Angular de gestion de suggestions avec intégration d'API REST utilisant HttpClient.

## 📋 Description

Cette application permet de gérer des suggestions avec les fonctionnalités CRUD complètes :
- Afficher la liste des suggestions
- Voir les détails d'une suggestion
- Ajouter une nouvelle suggestion
- Modifier une suggestion existante
- Supprimer une suggestion
- Liker une suggestion

## 🚀 Technologies utilisées

- **Angular 18.2.0**
- **TypeScript 5.5.2**
- **RxJS 7.8.0**
- **json-server** (API REST mock)
- **Bootstrap Icons**

## 📦 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)
- json-server (`npm install -g json-server`)

### Étapes d'installation

1. Cloner le repository
```bash
git clone <url-du-repo>
cd workshop1
```

2. Installer les dépendances
```bash
npm install
```

## 🎯 Lancement de l'application

### Option 1 : Lancement automatique (Windows)
```bash
start-project.bat
```

### Option 2 : Lancement automatique (Linux/Mac)
```bash
chmod +x start-project.sh
./start-project.sh
```

### Option 3 : Lancement manuel

**Terminal 1 - API REST (json-server)**
```bash
json-server --watch db.json --port 3000
```

**Terminal 2 - Application Angular**
```bash
ng serve
```

**Navigateur**
```
http://localhost:4200
```

## 📁 Structure du projet

```
src/app/
├── core/
│   ├── Services/
│   │   └── suggestion.service.ts    # Service HTTP avec CRUD complet
│   ├── header/
│   ├── footer/
│   └── home/
├── features/
│   └── suggestions/
│       ├── list-suggestion/         # Liste des suggestions
│       ├── suggestion-details/      # Détails d'une suggestion
│       ├── suggestion-form/         # Formulaire d'ajout/modification
│       └── suggestions-routing.module.ts
├── models/
│   └── suggestion.ts                # Interface Suggestion
└── services/
    └── suggestion.service.ts        # Service alternatif
```

## 🔧 Fonctionnalités implémentées

### Service SuggestionService (HttpClient)

- ✅ `getSuggestionsList()` - Récupérer toutes les suggestions
- ✅ `getSuggestionById(id)` - Récupérer une suggestion par ID
- ✅ `addSuggestion(suggestion)` - Ajouter une nouvelle suggestion
- ✅ `updateSuggestion(suggestion)` - Mettre à jour une suggestion
- ✅ `deleteSuggestion(id)` - Supprimer une suggestion

### Gestion des erreurs

- ✅ Retry automatique (2 tentatives) pour les requêtes GET
- ✅ Gestion centralisée des erreurs avec `catchError`
- ✅ Messages d'erreur utilisateur-friendly
- ✅ Indicateurs de chargement
- ✅ Rollback en cas d'erreur

### Interface utilisateur

- ✅ Liste des suggestions avec recherche
- ✅ Affichage des détails complets
- ✅ Formulaire avec validation réactive
- ✅ Badges colorés par statut
- ✅ Design responsive
- ✅ Animations et transitions

## 🧪 Tests

Pour lancer les tests unitaires :
```bash
ng test
```

## 📝 API REST (json-server)

L'API REST est disponible sur `http://localhost:3000` avec les endpoints suivants :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/suggestions` | Liste toutes les suggestions |
| GET | `/suggestions/:id` | Récupère une suggestion par ID |
| POST | `/suggestions` | Crée une nouvelle suggestion |
| PUT | `/suggestions/:id` | Met à jour une suggestion |
| DELETE | `/suggestions/:id` | Supprime une suggestion |

### Exemple de données

```json
{
  "id": 1,
  "title": "Organiser une journée team building",
  "description": "Suggestion pour organiser une journée de team building...",
  "category": "Événements",
  "date": "2025-01-20",
  "status": "acceptee",
  "nbLikes": 10
}
```

## 🐛 Dépannage

### Problème : Données non affichées

**Solution :** Vérifiez que json-server est lancé
```bash
json-server --watch db.json --port 3000
```

### Problème : Erreur CORS

**Solution :** Lancez json-server avec l'option host
```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

### Problème : Port déjà utilisé

**Solution :** Changez le port dans le service
```typescript
private apiUrl = 'http://localhost:3001/suggestions';
```

Consultez [TROUBLESHOOTING.md](TROUBLESHOOTING.md) pour plus de détails.

## 📚 Documentation supplémentaire

- [FIX-LIKES-ISSUE.md](FIX-LIKES-ISSUE.md) - Correction du problème des likes
- [FIX-NAN-ISSUE.md](FIX-NAN-ISSUE.md) - Correction du problème NaN
- [DETAILS-PAGE-FIXED.md](DETAILS-PAGE-FIXED.md) - Améliorations de la page de détails
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Guide de dépannage complet

## 👥 Auteur

Workshop réalisé dans le cadre du cours Angular - Module Services

## 📄 Licence

Ce projet est à usage éducatif uniquement.
