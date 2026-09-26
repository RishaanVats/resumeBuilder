import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { resumeDataStateService } from '../../../core/services/resumeDataStateService';
import { professionalSummaryData } from '../../types/types';
@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-professional-summary',
  styleUrl: './professional-summary.css',
  templateUrl: './professional-summary.html',
})
export class ProfessionalSummary {
  constructor(
    private resumeDataStateService: resumeDataStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const existingData = this.resumeDataStateService.get('professionalSummaryData');
    if (existingData) {
      this.professionalSummary.patchValue(existingData); // restores previously filled data
    }
  }

  public professionalSummary = new FormGroup({
    summary: new FormControl('', [Validators.required, Validators.minLength(10)]),
    skills: new FormControl('', [Validators.required, Validators.minLength(10)]),
    expYears: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    expMonths: new FormControl('', [Validators.required, Validators.min(0), Validators.max(11)]),
  });

  // onSubmit() {
  //   if (this.professionalSummary.valid) {
  //     // Handle form submission
  //     console.log('Form submitted successfully:', this.professionalSummary.value);
  //   }
  // }

  goNext() {
    console.log('Next section clicked');

    if (this.professionalSummary.valid) {
      console.log('Form is valid. Proceeding to the next section.');
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
      this.professionalSummary.markAllAsTouched();
    }
    const formValues = this.professionalSummary.getRawValue();
    const professionalSummaryData: professionalSummaryData = {
      summary: formValues.summary ?? '',
      skills: formValues.skills ?? '',
      expYears: formValues.expYears ?? '',
      expMonths: formValues.expMonths ?? '',
    };

    this.resumeDataStateService.patch('professionalSummaryData', professionalSummaryData); // save data before navigating
    this.router.navigate(['../work-experience'], { relativeTo: this.route });
  }

  goPrevious() {
    console.log('Previous button clicked from professional summary form');

    const formValues = this.professionalSummary.getRawValue();
    const professionalSummaryData: professionalSummaryData = {
      summary: formValues.summary ?? '',
      skills: formValues.skills ?? '',
      expYears: formValues.expYears ?? '',
      expMonths: formValues.expMonths ?? '',
    };

    this.resumeDataStateService.patch('professionalSummaryData', professionalSummaryData); // save data before navigating
    this.router.navigate(['../personal-info'], { relativeTo: this.route });
  }
}
