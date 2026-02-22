import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  id?: number;  // ID pour l'édition

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.initForm();

    // Récupérer l'ID depuis l'URL
    this.id = +this.route.snapshot.params['id'];

    // Si ID existe, charger les données pour édition
    if (this.id) {
      this.suggestionService.getSuggestionById(this.id).subscribe({
        next: (data) => {
          this.suggestionForm.patchValue(data);
        }
      });
    }
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();

      if (this.id) {
        // Mode UPDATE
        const updatedSuggestion: Suggestion = {
          id: this.id,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(formValue.date),
          status: formValue.status,
          nbLikes: 0
        };

        this.suggestionService.updateSuggestion(updatedSuggestion).subscribe({
          next: () => {
            alert('Suggestion modifiée avec succès !');
            this.router.navigate(['/suggestions']);
          }
        });
      } else {
        // Mode ADD
        const newSuggestion: Suggestion = {
          id: 0,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: 'en_attente',
          nbLikes: 0
        };

        this.suggestionService.addSuggestion(newSuggestion).subscribe({
          next: () => {
            alert('Suggestion ajoutée avec succès !');
            this.router.navigate(['/suggestions']);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/suggestions']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }
}