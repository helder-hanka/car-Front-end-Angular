import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarListItemComponent } from '../car-list-item/car-list-item.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  imports: [CarListItemComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  postsCar$!: Observable<Car[]>;
  loading$!: Observable<boolean>;
  // loading = false;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    this.initObservables();
    this.carService.getCars();
    // this.loading$ = this.carService.loading$;
    // // this.loading = true;
    // this.postsCar$ = this.route.data.pipe(
    //   // delay(1000),
    //   map((data) => data['posts'])
    //   // tap(() => (this.loading = false))
    // );
    // // console.log(this.loading$);
  }

  private initObservables() {
    this.loading$ = this.carService.loading$;
    this.postsCar$ = this.carService.cars$;
  }
}
