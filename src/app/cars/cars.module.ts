import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarService } from './services/car.service';
// import { PostResolver } from './resolvers/resolver';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CarsRoutingModule, SharedModule],
  providers: [CarService],
  // providers: [CarService, PostResolver],
})
export class CarsModule {}
