import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { personalInfoData } from '../../types/types';
import { resumeDataStateService } from '../../../core/services/resumeDataStateService';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-personal-info',
  styleUrl: './personal-info.css',
  templateUrl: './personal-info.html',
})
export class PersonalInfo {
  constructor(
    private resumeDataStateService: resumeDataStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const existingData = this.resumeDataStateService.get('personalInfoData');
    if (existingData) {
      this.personalInformation.patchValue(existingData); // restores previously filled data
    }
  }

  // Standard regular expression for matching URLs
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  public personalInformation = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    currentAddress: new FormGroup({
      currentCity: new FormControl('', [Validators.required]),
      currentState: new FormControl('', [Validators.required]),
      currentCountry: new FormControl('', [Validators.required]),
    }),
    linkedin: new FormControl('', [
      Validators.required,
      Validators.pattern(new RegExp(this.urlPattern)),
    ]),
    github: new FormControl('', [
      Validators.required,
      Validators.pattern(new RegExp(this.urlPattern)),
    ]),
    portfolio: new FormControl('', [Validators.pattern(new RegExp(this.urlPattern))]),
    professionalUrl: new FormControl('', [Validators.pattern(new RegExp(this.urlPattern))]),
    nationality: new FormControl('', [Validators.minLength(3)]),
    alternateContact: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
  });

  goNext() {
    console.log('Next section clicked');

    if (this.personalInformation.valid) {
      console.log('Form is valid. Proceeding to the next section.');
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
      this.personalInformation.markAllAsTouched();
    }
    const formValues = this.personalInformation.getRawValue();
    const personalInfo: personalInfoData = {
      fullName: formValues.fullName ?? '',
      email: formValues.email ?? '',
      phone: formValues.phone ?? '',
      currentAddress: {
        currentCity: formValues.currentAddress?.currentCity ?? '',
        currentState: formValues.currentAddress?.currentState ?? '',
        currentCountry: formValues.currentAddress?.currentCountry ?? '',
      },
      linkedin: formValues.linkedin ?? '',
      github: formValues.github ?? '',
      portfolio: formValues.portfolio ?? '',
      professionalUrl: formValues.professionalUrl ?? '',
      nationality: formValues.nationality ?? '',
      alternateContact: formValues.alternateContact ?? '',
    };

    this.resumeDataStateService.patch('personalInfoData', personalInfo); // save data before navigating
    this.router.navigate(['../professional-summary'], { relativeTo: this.route });
  }
}
