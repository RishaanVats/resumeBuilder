import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-personal-info',
  styleUrl: './personal-info.css',
  templateUrl: './personal-info.html',
})
export class PersonalInfo {
  personalInformation = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    currentAddress: new FormGroup({
      currentCity: new FormControl('', [Validators.required]),
      currentState: new FormControl('', [Validators.required]),
      currentCountry: new FormControl('', [Validators.required]),
    }),
    linkedin: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    portfolio: new FormControl(''),
    professionalUrl: new FormControl(''),
    nationality: new FormControl(''),
    alternateContact: new FormControl(''),
  });

  nextSection = (): void => {
    console.log('Next section clicked');

    if (this.personalInformation.valid) {
      console.log('Form is valid. Proceeding to the next section.');
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
      this.personalInformation.markAllAsTouched();
    }
  };
}
