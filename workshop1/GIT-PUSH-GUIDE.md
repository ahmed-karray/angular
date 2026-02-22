# 📤 Guide pour pousser votre travail sur Git

## 🎯 Étapes pour pousser votre code

### 1. Vérifier le statut de Git

```bash
git status
```

Cela vous montrera tous les fichiers modifiés, ajoutés ou supprimés.

### 2. Ajouter tous les fichiers

```bash
git add .
```

Ou pour ajouter des fichiers spécifiques :
```bash
git add src/app/
git add db.json
git add README.md
```

### 3. Créer un commit avec un message descriptif

```bash
git commit -m "feat: Implémentation complète du Workshop n°5 - Services Angular

- Ajout du service SuggestionService avec HttpClient
- Implémentation CRUD complète (GET, POST, PUT, DELETE)
- Gestion des erreurs avec catchError et retry
- Page de liste avec recherche et filtres
- Page de détails avec actions (like, modifier, supprimer)
- Formulaire d'ajout/modification avec validation
- Intégration json-server pour l'API REST
- Correction des problèmes NaN et likes
- Documentation complète (README, TROUBLESHOOTING, etc.)
"
```

### 4. Pousser vers le repository distant

Si c'est votre premier push :
```bash
git push -u origin main
```

Ou si la branche existe déjà :
```bash
git push
```

Si vous utilisez une autre branche (par exemple `master`) :
```bash
git push -u origin master
```

## 🔧 Configuration initiale (si nécessaire)

### Si vous n'avez pas encore de repository Git

1. **Initialiser Git**
```bash
git init
```

2. **Configurer votre identité**
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

3. **Ajouter le repository distant**
```bash
git remote add origin https://github.com/votre-username/votre-repo.git
```

Ou avec SSH :
```bash
git remote add origin git@github.com:votre-username/votre-repo.git
```

4. **Vérifier le remote**
```bash
git remote -v
```

### Si vous avez cloné un repository existant

Le remote est déjà configuré, vous pouvez directement faire :
```bash
git add .
git commit -m "votre message"
git push
```

## 📝 Messages de commit recommandés

Utilisez des messages clairs et descriptifs :

### Format conventionnel
```
<type>: <description courte>

<description détaillée (optionnelle)>
```

### Types de commit
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style CSS
- `refactor:` Refactorisation du code
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

### Exemples
```bash
# Fonctionnalité complète
git commit -m "feat: Ajout du service de suggestions avec HttpClient"

# Correction de bug
git commit -m "fix: Correction du problème NaN dans les likes"

# Documentation
git commit -m "docs: Ajout du README et guides de dépannage"

# Refactorisation
git commit -m "refactor: Amélioration de la page de détails"
```

## 🌿 Gestion des branches

### Créer une nouvelle branche
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

### Changer de branche
```bash
git checkout main
```

### Lister les branches
```bash
git branch
```

### Pousser une nouvelle branche
```bash
git push -u origin feature/nom-de-la-fonctionnalite
```

## 🔄 Commandes utiles

### Voir l'historique des commits
```bash
git log
```

Ou version simplifiée :
```bash
git log --oneline
```

### Annuler le dernier commit (garder les modifications)
```bash
git reset --soft HEAD~1
```

### Voir les différences avant de commiter
```bash
git diff
```

### Voir les fichiers modifiés
```bash
git status
```

### Retirer un fichier du staging
```bash
git reset HEAD fichier.txt
```

## ⚠️ Fichiers à ne PAS pousser

Ces fichiers sont déjà dans `.gitignore` :
- `/node_modules/` - Dépendances npm
- `/.angular/` - Cache Angular
- `/dist/` - Build de production
- `.vscode/` - Configuration VS Code (sauf settings partagés)
- `.DS_Store` - Fichiers système Mac
- `npm-debug.log` - Logs npm

## 🚀 Workflow complet recommandé

```bash
# 1. Vérifier le statut
git status

# 2. Ajouter les fichiers
git add .

# 3. Vérifier ce qui va être commité
git status

# 4. Créer le commit
git commit -m "feat: Description de votre travail"

# 5. Pousser vers le remote
git push

# 6. Vérifier sur GitHub/GitLab que tout est bien poussé
```

## 🆘 Résolution de problèmes

### Erreur : "Updates were rejected"
```bash
# Récupérer les dernières modifications
git pull origin main

# Résoudre les conflits si nécessaire
# Puis pousser à nouveau
git push
```

### Erreur : "Permission denied"
Vérifiez vos credentials ou utilisez SSH au lieu de HTTPS.

### Erreur : "fatal: not a git repository"
```bash
git init
git remote add origin <url-du-repo>
```

## ✅ Checklist avant de pousser

- [ ] Le code compile sans erreur (`ng build`)
- [ ] Les tests passent (`ng test`)
- [ ] Le .gitignore est à jour
- [ ] Les fichiers sensibles ne sont pas inclus
- [ ] Le README est à jour
- [ ] Le message de commit est clair et descriptif
- [ ] Vous avez testé l'application localement

## 🎓 Commande complète pour ce workshop

```bash
# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "feat: Workshop n°5 - Services Angular complet

- Service SuggestionService avec HttpClient
- CRUD complet (Create, Read, Update, Delete)
- Gestion d'erreurs avec retry et catchError
- Liste des suggestions avec recherche
- Page de détails avec actions
- Formulaire avec validation réactive
- Intégration json-server
- Documentation complète
"

# Pousser vers le repository
git push -u origin main
```

Voilà ! Votre travail est maintenant sur Git ! 🎉
