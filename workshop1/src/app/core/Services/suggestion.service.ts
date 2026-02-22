import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Récupérer une suggestion par ID
  getSuggestionById(id: number): Observable<Suggestion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Suggestion>(url).pipe(
      tap(data => console.log('🔍 Réponse HTTP brute:', data)),

      catchError(this.handleError)
    );
  }

  // Ajouter une nouvelle suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.apiUrl, suggestion).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour une suggestion
  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.apiUrl}/${suggestion.id}`, suggestion).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion centralisée des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
