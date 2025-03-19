// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   MaybeAsync,
//   RedirectCommand,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { CarService } from '../services/car.service';
// import { Car } from '../models/car';

// @Injectable()
// export class PostResolver implements Resolve<Car[]> {
//   constructor(private carService: CarService) {}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): MaybeAsync<Car[] | RedirectCommand> {
//     return this.carService.getCars();
//   }
// }
