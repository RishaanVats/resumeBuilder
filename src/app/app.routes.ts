import { Routes } from '@angular/router';
import { Home } from './shared/components/home/home';
import { PersonalInfo } from './shared/components/personal-info/personal-info';
import { ProfessionalSummary } from './shared/components/professional-summary/professional-summary';
import { WorkExperience } from './shared/components/work-experience/work-experience';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'personal-info', component: PersonalInfo },
  { path: 'professional-summary', component: ProfessionalSummary },
  { path: 'work-experience', component: WorkExperience },
  { path: '**', redirectTo: '' },
];
