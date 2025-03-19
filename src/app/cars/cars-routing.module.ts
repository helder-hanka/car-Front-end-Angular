import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PostResolver } from './resolvers/resolver';
import { CarListComponent } from './components/car-list/car-list.component';
import { SigleCarComponent } from './components/sigle-car/sigle-car.component';

const routes: Routes = [
  { path: 'cars-list', component: CarListComponent },
  { path: 'cars-list/:id', component: SigleCarComponent },
  { path: '', redirectTo: 'cars-list', pathMatch: 'full' },
  // { path: '', component: CarListComponent, resolve: { posts: PostResolver } },
  // { path: '', component: CarListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
