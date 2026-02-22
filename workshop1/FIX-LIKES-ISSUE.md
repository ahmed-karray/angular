# 🔧 Correction du problème des likes

## 🐛 Problème identifié

Lorsqu'on cliquait sur le bouton "like", le nombre de likes :
- Diminuait au lieu d'augmenter
- Devenait NaN (Not a Number)

## 🔍 Cause du problème

Le service utilisait une méthode `likeSuggesetion()` qui appelait un endpoint PATCH personnalisé :

```typescript
// ❌ PROBLÈME : Endpoint qui n'existe pas dans json-server
likeSuggesetion(id: number): Observable<Suggestion> {
  return this.http.patch<Suggestion>(`${this.apiUrl}/${id}/like`, {});
}
```

**Pourquoi ça ne fonctionnait pas ?**

1. Json-server ne supporte pas les endpoints personnalisés comme `/suggestions/1/like`
2. La requête PATCH échouait
3. Le code d'erreur décrémentait les likes (`s.nbLikes--`)
4. Ou les données reçues étaient incorrectes, causant NaN

## ✅ Solution implémentée

### 1. Suppression de la méthode problématique

La méthode `likeSuggesetion()` a été supprimée du service.

### 2. Utilisation de `updateSuggestion()` existante

Au lieu d'un endpoint personnalisé, on utilise la méthode PUT standard :

```typescript
// ✅ SOLUTION : Utiliser PUT pour mettre à jour toute la suggestion
updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
  return this.http.put<Suggestion>(`${this.apiUrl}/${suggestion.id}`, suggestion);
}
```

### 3. Mise à jour dans les composants

#### Dans `list-suggestion.component.ts` :

```typescript
likeSuggestion(s: Suggestion): void {
  // Sauvegarder la valeur originale
  const originalLikes = s.nbLikes;
  
  // Incrémenter localement d'abord (optimistic update)
  s.nbLikes++;
  
  // Mettre à jour sur le serveur
  this.suggestionService.updateSuggestion(s).subscribe({
    next: (updatedSuggestion) => {
      // Remplacer avec les données du serveur
      const index = this.suggestions.findIndex(sug => sug.id === s.id);
      if (index !== -1) {
        this.suggestions[index] = updatedSuggestion;
      }
      console.log('Suggestion mise à jour avec succès');
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour:', err);
      // Restaurer la valeur originale en cas d'erreur
      s.nbLikes = originalLikes;
    }
  });
}
```

#### Dans `suggestion-details.component.ts` :

```typescript
likeSuggestion(): void {
  if (this.suggestion) {
    // Sauvegarder la valeur originale
    const originalLikes = this.suggestion.nbLikes;
    
    // Incrémenter localement
    this.suggestion.nbLikes++;
    
    // Mettre à jour sur le serveur
    this.suggestionService.updateSuggestion(this.suggestion).subscribe({
      next: (updatedSuggestion) => {
        // Mettre à jour avec les données du serveur
        this.suggestion = updatedSuggestion;
        console.log(`Likes: ${this.suggestion.nbLikes}`);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        // Restaurer la valeur originale en cas d'erreur
        if (this.suggestion) {
          this.suggestion.nbLikes = originalLikes;
        }
      }
    });
  }
}
```

## 🎯 Avantages de cette solution

1. **Compatible avec json-server** : Utilise l'endpoint PUT standard
2. **Optimistic update** : L'interface se met à jour immédiatement
3. **Rollback en cas d'erreur** : Si la requête échoue, on restaure la valeur originale
4. **Synchronisation serveur** : Les données du serveur remplacent les données locales après succès

## 🧪 Test de la correction

1. Lancez json-server : `json-server --watch db.json --port 3000`
2. Lancez l'application : `ng serve`
3. Cliquez sur le bouton "👍" d'une suggestion
4. Le nombre de likes devrait augmenter de 1
5. Vérifiez dans `db.json` que la valeur a bien été mise à jour

## 📝 Endpoints json-server utilisés

- `GET /suggestions` - Liste toutes les suggestions
- `GET /suggestions/:id` - Récupère une suggestion
- `POST /suggestions` - Crée une suggestion
- `PUT /suggestions/:id` - Met à jour une suggestion complète ✅ (utilisé pour les likes)
- `DELETE /suggestions/:id` - Supprime une suggestion

**Note :** json-server ne supporte pas les endpoints personnalisés comme `/suggestions/:id/like` sans configuration supplémentaire.
