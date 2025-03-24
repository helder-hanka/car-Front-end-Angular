import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarListItemComponent } from './components/car-list-item/car-list-item.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'cars/add-car', component: AddCarComponent },
  { path: 'cars/:id', component: CarListItemComponent },
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
