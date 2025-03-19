import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Observable, switchMap } from 'rxjs';
import { Car } from '../../models/car';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sigle-car',
  imports: [SharedModule, AsyncPipe],
  templateUrl: './sigle-car.component.html',
  styleUrl: './sigle-car.component.scss',
})
export class SigleCarComponent implements OnInit {
  loading$!: Observable<boolean>;
  car$!: Observable<Car>;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable() {
    this.loading$ = this.carService.loading$;

    this.car$ = this.route.params.pipe(
      switchMap((params) => this.carService.getCarById(+params['id']))
    );
  }
}
