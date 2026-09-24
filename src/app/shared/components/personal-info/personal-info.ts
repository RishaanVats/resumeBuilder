import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  selector: 'app-personal-info',
  styleUrl: './personal-info.css',
  templateUrl: './personal-info.html',
})
export class PersonalInfo {

  // Standard regular expression for matching URLs
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  public personalInformation = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    currentAddress: new FormGroup({
      currentCity: new FormControl('', [Validators.required]),
      currentState: new FormControl('', [Validators.required]),
      currentCountry: new FormControl('', [Validators.required]),
    }),
    linkedin: new FormControl('', [Validators.required, Validators.pattern(new RegExp(this.urlPattern))]),
    github: new FormControl('', [Validators.required, Validators.pattern(new RegExp(this.urlPattern))]),
    portfolio: new FormControl('', [Validators.pattern(new RegExp(this.urlPattern))]),
    professionalUrl: new FormControl('', [Validators.pattern(new RegExp(this.urlPattern))]),
    nationality: new FormControl('', [Validators.minLength(3)]),
    alternateContact: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
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
