import { Routes } from '@angular/router';
import { GardService } from './auth/guards/gard.service';

export const routes: Routes = [
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then((m) => m.CarsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [GardService],
  },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' },
];
