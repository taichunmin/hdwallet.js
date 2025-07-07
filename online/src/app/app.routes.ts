import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dumps/all/BTC',
    pathMatch: 'full'
  },
  {
    path: 'tools',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'tools/:tools',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'dumps',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'dumps/:ecc',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'dumps/:ecc/:symbol',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dumps/all/BTC',
    pathMatch: 'full'
  }
];
