import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  selector: 'app-professional-summary',
  styleUrl: './professional-summary.css',
  templateUrl: './professional-summary.html',
})
export class ProfessionalSummary {
  constructor() {}

  public professionalSummaryForm = new FormGroup({
    summary: new FormControl('', [Validators.required, Validators.minLength(10)]),
    skills: new FormControl('', [Validators.required, Validators.minLength(10)]),
    expYears: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    expMonths: new FormControl('', [Validators.required, Validators.min(0), Validators.max(11)]),
  });

  onSubmit() {
    if (this.professionalSummaryForm.valid) {
      // Handle form submission
      console.log('Form submitted successfully:', this.professionalSummaryForm.value);
    }
  }
}
