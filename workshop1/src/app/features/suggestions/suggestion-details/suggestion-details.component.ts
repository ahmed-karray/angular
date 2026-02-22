import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion: Suggestion | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.suggestionId = +params['id'];
      console.log('aaaaaaaaa', this.suggestionId);
      this.loadSuggestion();
    });
  }

  loadSuggestion(): void {
    this.loading = true;
    this.error = null;

    this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
      next: (data: any) => { // Use any or a specific Response interface
        console.log('Réponse brute:', data);

        // 1. Check if the nested suggestion object exists
        if (!data || !data.suggestion) {
          this.error = `Suggestion ${this.suggestionId} introuvable`;
          this.loading = false;
          return;
        }

        // 2. Assign the INNER suggestion object
        this.suggestion = data.suggestion;

        console.log('Données assignées à this.suggestion:', this.suggestion);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Erreur lors du chargement';
        this.loading = false;
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['/suggestions']);
  }

  likeSuggestion(): void {
    if (!this.suggestion || !this.suggestion.id) {
      console.error("Impossible de liker : ID manquant", this.suggestion);
      return;
    }

    // 1. Save original state for rollback
    const originalSuggestion = { ...this.suggestion };

    // 2. Optimistic Update (update UI immediately)
    this.suggestion.nbLikes = (Number(this.suggestion.nbLikes) || 0) + 1;

    this.suggestionService.updateSuggestion(this.suggestion).subscribe({
      next: (response: any) => {
        // 3. Extract the suggestion object correctly
        const updatedData = response.suggestion ? response.suggestion : response;

        // 4. Update local state while ENSURING the ID stays
        this.suggestion = {
          ...updatedData,
          id: updatedData.id || originalSuggestion.id, // Keep the ID!
          nbLikes: updatedData.nbLikes !== undefined ? Number(updatedData.nbLikes) : originalSuggestion.nbLikes + 1
        };
        this.loadSuggestion();
        //console.log('Mis à jour avec succès. ID actuel:', this.suggestion.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        // Rollback on error
        this.suggestion = originalSuggestion;
        alert('Erreur lors de la mise à jour des likes');
      }
    });
  }

  editSuggestion(): void {
    if (this.suggestion?.id) {
      this.router.navigate(['/suggestions/edit', this.suggestion.id]);
    }
  }

  deleteSuggestion(): void {
    if (!this.suggestion?.id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(this.suggestion.id).subscribe({
        next: () => {
          alert('Suggestion supprimée avec succès');
          this.router.navigate(['/suggestions']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  getStatusLabel(): string {
    if (!this.suggestion) return '';

    switch (this.suggestion.status) {
      case 'acceptee':
        return '✅ Acceptée';
      case 'refusee':
        return '❌ Refusée';
      case 'en_attente':
        return '⏳ En attente';
      default:
        return this.suggestion.status;
    }
  }

  getStatusClass(): string {
    if (!this.suggestion) return '';

    switch (this.suggestion.status) {
      case 'acceptee':
        return 'badge-accepted';
      case 'refusee':
        return 'badge-refused';
      case 'en_attente':
        return 'badge-pending';
      default:
        return '';
    }
  }
}
