import { Routes } from '@angular/router';
import { Home } from './shared/components/home/home';
import { PersonalInfo } from './shared/components/personal-info/personal-info';
import { ProfessionalSummary } from './shared/professional-summary/professional-summary';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'personal-info', component: PersonalInfo },
  { path: 'professional-summary', component: ProfessionalSummary },
  { path: '**', redirectTo: '' },
];
