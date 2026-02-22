import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        console.log('📥 Données brutes reçues:', data);
        // S'assurer que nbLikes est un nombre pour chaque suggestion
        this.suggestions = data.map(s => {
          const mapped = {
            ...s,
            id: Number(s.id),
            nbLikes: Number(s.nbLikes)
          };
          console.log('Suggestion mappée:', mapped);
          return mapped;
        });
        console.log('✅ Suggestions chargées:', this.suggestions);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
      }
    });
  }


  filteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }
    const searchLower = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(searchLower) ||
      s.category.toLowerCase().includes(searchLower)
    );
  }

  likeSuggestion(s: Suggestion): void {
    console.log('Avant incrémentation:', s.nbLikes, typeof s.nbLikes);

    // Convertir en nombre et sauvegarder la valeur originale
    const originalLikes = Number(s.nbLikes);

    // Incrémenter localement (s'assurer que c'est un nombre)
    s.nbLikes = originalLikes + 1;

    console.log('Après incrémentation:', s.nbLikes, typeof s.nbLikes);

    // Mettre à jour sur le serveur
    this.suggestionService.updateSuggestion(s).subscribe({
      next: (updatedSuggestion) => {
        console.log('Réponse du serveur:', updatedSuggestion);
        // Mettre à jour avec les données du serveur (convertir en nombre)
        const index = this.suggestions.findIndex(sug => sug.id === s.id);
        if (index !== -1) {
          this.suggestions[index] = {
            ...updatedSuggestion,
            nbLikes: Number(updatedSuggestion.nbLikes)
          };
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

  addToFavoris(s: Suggestion): void {
    console.log('Ajouté aux favoris :', s);
  }

  debugNavigation(s: Suggestion): void {
    console.log('Navigation vers suggestion:', s);
    console.log('ID:', s.id, 'Type:', typeof s.id);
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          // Recharger la liste
          this.suggestionService.getSuggestionsList().subscribe({
            next: (data) => {
              this.suggestions = data.map(s => ({
                ...s,
                nbLikes: Number(s.nbLikes)
              }));
            }
          });
        }
      });
    }
  }
}
