import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
    providedIn: 'root'
})
export class SuggestionService {
    private suggestionsSubject = new BehaviorSubject<Suggestion[]>([
        {
            id: 1,
            title: 'Organiser une journée team building',
            description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
            category: 'Événements',
            date: new Date('2025-01-20'),
            status: 'acceptee',
            nbLikes: 10
        },
        {
            id: 2,
            title: 'Améliorer le système de réservation',
            description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
            category: 'Technologie',
            date: new Date('2025-01-15'),
            status: 'refusee',
            nbLikes: 0
        },
        {
            id: 3,
            title: 'Créer un système de récompenses',
            description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
            category: 'Ressources Humaines',
            date: new Date('2025-01-25'),
            status: 'refusee',
            nbLikes: 0
        },
        {
            id: 4,
            title: 'Moderniser l\'interface utilisateur',
            description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
            category: 'Technologie',
            date: new Date('2025-01-30'),
            status: 'en_attente',
            nbLikes: 0
        }
    ]);

    suggestions$ = this.suggestionsSubject.asObservable();

    getSuggestions(): Suggestion[] {
        return this.suggestionsSubject.value;
    }

    addSuggestion(suggestion: Suggestion): void {
        const currentSuggestions = this.suggestionsSubject.value;
        const newId = Math.max(...currentSuggestions.map(s => s.id), 0) + 1;
        const newSuggestion = { ...suggestion, id: newId };
        this.suggestionsSubject.next([...currentSuggestions, newSuggestion]);
    }

    updateSuggestion(suggestion: Suggestion): void {
        const currentSuggestions = this.suggestionsSubject.value;
        const index = currentSuggestions.findIndex(s => s.id === suggestion.id);
        if (index !== -1) {
            currentSuggestions[index] = suggestion;
            this.suggestionsSubject.next([...currentSuggestions]);
        }
    }

    getSuggestionById(id: number): Suggestion | undefined {
        return this.suggestionsSubject.value.find(s => s.id === id);
    }
}
