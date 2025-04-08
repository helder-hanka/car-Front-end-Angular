import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarListItemComponent } from '../car-list-item/car-list-item.component';
import { Observable } from 'rxjs';
import { Car } from '../../../cars/models/car';
import { CarService } from '../../../cars/services/car.service';

@Component({
  selector: 'app-car-list:not(p)rivate',
  standalone: true,
  imports: [CarListItemComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './car-list-user.component.html',
  styleUrl: './car-list-user.component.scss',
  host: { 'some-binding': 'some-value' },
})
export class CarListComponent implements OnInit {
  postsCar$!: Observable<Car[]>;
  loading$!: Observable<boolean>;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.carService.loading$;
    this.carService.getUserCars();
    this.postsCar$ = this.carService.userCars$;
  }
}
