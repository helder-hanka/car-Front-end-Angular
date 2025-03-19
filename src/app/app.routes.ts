import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then((m) => m.CarsModule),
  },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' },
  // { path: '**', redirectTo: 'cars', pathMatch: 'full' },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
];
