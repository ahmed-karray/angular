# 🔧 Guide de dépannage - Données manquantes

## 🐛 Symptômes observés

- Titre vide
- Description vide  
- Catégorie affiche "Non définie"
- Date vide
- Statut vide
- Nombre de likes affiche "NaN"

## 🎯 Cause probable

**Les données ne sont pas chargées depuis l'API** - json-server n'est probablement pas lancé ou l'URL est incorrecte.

## ✅ Solution étape par étape

### Étape 1 : Vérifier que json-server est lancé

Ouvrez un terminal et lancez :

```bash
json-server --watch db.json --port 3000
```

Vous devriez voir :
```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3000/suggestions

Home
http://localhost:3000
```

### Étape 2 : Tester l'API manuellement

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000/suggestions
```

Vous devriez voir la liste des suggestions en JSON.

Testez aussi une suggestion spécifique :
```
http://localhost:3000/suggestions/1
```

Vous devriez voir :
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

### Étape 3 : Vérifier la console du navigateur

1. Ouvrez la console (F12)
2. Naviguez vers une suggestion
3. Cherchez les messages :
   - ✅ "Données brutes reçues:" → Les données arrivent
   - ❌ "Erreur lors du chargement:" → Problème de connexion

### Étape 4 : Vérifier l'URL de l'API

Dans `src/app/Core/Services/suggestion.service.ts`, vérifiez :

```typescript
private apiUrl = 'http://localhost:3000/suggestions';
```

### Étape 5 : Vérifier les CORS

Si json-server est lancé mais les données ne chargent pas, vérifiez les erreurs CORS dans la console.

Solution : Lancez json-server avec l'option CORS :
```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

## 🚀 Procédure de lancement complète

### Terminal 1 : json-server
```bash
cd [votre-projet]
json-server --watch db.json --port 3000
```

Attendez de voir "Done" avant de continuer.

### Terminal 2 : Angular
```bash
cd [votre-projet]
ng serve
```

Attendez que la compilation soit terminée.

### Navigateur
```
http://localhost:4200
```

## 🔍 Vérifications supplémentaires

### 1. Vérifier que db.json existe et contient des données

```bash
cat db.json
```

Ou ouvrez le fichier dans votre éditeur.

### 2. Vérifier le port

Si le port 3000 est déjà utilisé, json-server utilisera un autre port (3001, 3002, etc.).

Vérifiez le message de json-server et mettez à jour l'URL dans le service :
```typescript
private apiUrl = 'http://localhost:3001/suggestions'; // Si port différent
```

### 3. Vérifier le réseau dans DevTools

1. Ouvrez DevTools (F12)
2. Onglet "Network" / "Réseau"
3. Naviguez vers une suggestion
4. Cherchez la requête vers `localhost:3000/suggestions/1`
5. Vérifiez :
   - Status : 200 OK ✅
   - Status : 404 Not Found ❌ (json-server pas lancé)
   - Status : Failed ❌ (problème de connexion)

## 📋 Checklist de diagnostic

- [ ] json-server est lancé (terminal ouvert avec le message "Done")
- [ ] http://localhost:3000/suggestions affiche des données JSON
- [ ] http://localhost:3000/suggestions/1 affiche une suggestion
- [ ] L'application Angular est lancée (ng serve)
- [ ] La console du navigateur ne montre pas d'erreurs CORS
- [ ] L'onglet Network montre des requêtes vers localhost:3000
- [ ] Les requêtes retournent un status 200

## 🎯 Messages d'erreur courants

### "Failed to fetch"
**Cause :** json-server n'est pas lancé  
**Solution :** Lancez json-server dans un terminal

### "404 Not Found"
**Cause :** L'URL est incorrecte ou la ressource n'existe pas  
**Solution :** Vérifiez l'URL et l'ID de la suggestion

### "CORS policy"
**Cause :** Problème de CORS  
**Solution :** Lancez json-server avec `--host 0.0.0.0`

### "Connection refused"
**Cause :** Mauvais port ou json-server pas lancé  
**Solution :** Vérifiez le port et relancez json-server

## ✅ Test final

Une fois json-server lancé, rechargez la page et vous devriez voir :

1. **Dans la console :**
   ```
   ID de la suggestion: 1
   ✅ Données brutes reçues: {id: 1, title: "...", ...}
   ✅ Category: Événements
   ✅ Title: Organiser une journée team building
   ...
   ```

2. **Sur la page :**
   - Titre affiché
   - Description affichée
   - Catégorie dans un badge bleu
   - Date formatée
   - Statut avec badge coloré
   - Nombre de likes (nombre, pas NaN)

## 🆘 Si le problème persiste

1. Fermez tous les terminaux
2. Supprimez le cache Angular : `rm -rf .angular`
3. Relancez json-server
4. Relancez ng serve
5. Videz le cache du navigateur (Ctrl+Shift+Delete)
6. Rechargez la page (Ctrl+F5)
