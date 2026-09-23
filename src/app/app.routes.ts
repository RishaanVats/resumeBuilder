import { Routes } from '@angular/router';
import { Home } from './shared/components/home/home';
import { PersonalInfo } from './shared/components/personal-info/personal-info';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'personal-info', component: PersonalInfo },
  { path: '**', redirectTo: '' },
];
