import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';

import { resumeDataStateService } from '../../../core/services/resumeDataStateService';
import { workExperienceData } from '../../types/types';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-work-experience',
  styleUrl: './work-experience.css',
  templateUrl: './work-experience.html',
})
export class WorkExperience {
  constructor(
    private resumeDataStateService: resumeDataStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  employmentType = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  workType =  ['On-site', 'Remote', 'Hybrid'];
  
  ngOnInit() {
    this.syncEndDateState();

    this.workExperience.get('currentlyWorking')?.valueChanges.subscribe(() => {
      this.syncEndDateState();
    });

    const existingData = this.resumeDataStateService.get('workExperienceData');
    if (existingData) {
      this.workExperience.patchValue(existingData); // restores previously filled data
    }
  }

  private syncEndDateState() {
    const currentlyWorking = this.workExperience.get('currentlyWorking')?.value === true;
    const endDateControl = this.workExperience.get('endDate');

    if (currentlyWorking) {
      endDateControl?.disable({ emitEvent: false });
      endDateControl?.setValue('', { emitEvent: false });
      return;
    }

    endDateControl?.enable({ emitEvent: false });
  }

  public workExperience = new FormGroup({
    jobTitle: new FormControl('', [Validators.required, Validators.minLength(10)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(10)]),
    employmentType: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    location: new FormControl('', [Validators.required, Validators.min(0), Validators.max(15)]),
    workType: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl(''),
    currentlyWorking: new FormControl<boolean>(false),
    jobDescription: new FormControl('', Validators.required),
    responsibilities: new FormControl('', Validators.required),
    achievements: new FormControl(''),
    keyProjects: new FormControl<string[]>([], Validators.required),
    technologiesUsed: new FormControl<string[]>([], Validators.required),
    customInformation: new FormControl(''),
  });

  goNext() {
    console.log('Next section clicked');

    if (this.workExperience.valid) {
      console.log('Form is valid. Proceeding to the next section.');
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
      this.workExperience.markAllAsTouched();
    }
    const formValues = this.workExperience.getRawValue();
    const keyProjects = Array.isArray(formValues.keyProjects) ? formValues.keyProjects : [];
    const technologiesUsed = Array.isArray(formValues.technologiesUsed)
      ? formValues.technologiesUsed
      : [];
    const workType = (formValues.workType ?? '') as 'On-site' | 'Remote' | 'Hybrid';
    const employmentType = (formValues.employmentType ?? '') as
      'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    const workExperienceData: workExperienceData = {
      jobTitle: formValues.jobTitle ?? '',
      companyName: formValues.companyName ?? '',
      employmentType,
      location: formValues.location ?? '',
      workType,
      startDate: formValues.startDate ?? '',
      endDate: formValues.endDate ?? '',
      currentlyWorking: Boolean(formValues.currentlyWorking),
      jobDescription: formValues.jobDescription ?? '',
      responsibilities: formValues.responsibilities ?? '',
      achievements: formValues.achievements ?? '',
      keyProjects,
      technologiesUsed,
      customInformation: formValues.customInformation ?? '',
    };

    this.resumeDataStateService.patch('workExperienceData', workExperienceData); // save data before navigating
    this.router.navigate(['../work-experience'], { relativeTo: this.route });
  }

  goPrevious() {
    console.log('Previous button clicked from professional summary form');

    const formValues = this.workExperience.getRawValue();
    const keyProjects = Array.isArray(formValues.keyProjects) ? formValues.keyProjects : [];
    const technologiesUsed = Array.isArray(formValues.technologiesUsed)
      ? formValues.technologiesUsed
      : [];
    const workType = (formValues.workType ?? '') as 'On-site' | 'Remote' | 'Hybrid';
    const employmentType = (formValues.employmentType ?? '') as
      'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    const workExperienceData: workExperienceData = {
      jobTitle: formValues.jobTitle ?? '',
      companyName: formValues.companyName ?? '',
      employmentType,
      location: formValues.location ?? '',
      workType,
      startDate: formValues.startDate ?? '',
      endDate: formValues.endDate ?? '',
      currentlyWorking: Boolean(formValues.currentlyWorking),
      jobDescription: formValues.jobDescription ?? '',
      responsibilities: formValues.responsibilities ?? '',
      achievements: formValues.achievements ?? '',
      keyProjects,
      technologiesUsed,
      customInformation: formValues.customInformation ?? '',
    };

    this.resumeDataStateService.patch('workExperienceData', workExperienceData); // save data before navigating
    this.router.navigate(['../personal-info'], { relativeTo: this.route });
  }
}
