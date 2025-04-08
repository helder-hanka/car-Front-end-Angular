import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list-user.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingleCarComponent } from './components/single-car/single-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'cars/add-car', component: AddCarComponent },
  { path: 'cars/update-car/:id', component: UpdateCarComponent },
  { path: 'cars/:id', component: SingleCarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
