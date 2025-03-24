import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Car } from '../models/car';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject<boolean>(false);
  // private _loading = false;
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _cars$ = new BehaviorSubject<Car[]>([]);
  get cars$(): Observable<Car[]> {
    return this._cars$.asObservable();
  }

  private lastCarsLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getCars() {
    if (Date.now() - this.lastCarsLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Car[]>(`${environment.apiUrl}/public`)
      .pipe(
        delay(1000),
        tap((cars) => {
          this.lastCarsLoad = Date.now();
          this._cars$.next(cars);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getCarById(id: number): Observable<Car> {
    if (!this.lastCarsLoad) {
      this.getCars();
    }
    return this.cars$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === id)[0]
      )
    );
  }

  addCar(car: Car): Observable<Car> {
    this.setLoadingStatus(true);
    return this.http.post<Car>(`${environment.apiUrlcar}/create`, car).pipe(
      tap((addedCar) => {
        const currentCars = this._cars$.value;
        this._cars$.next([...currentCars, addedCar]);
        this.setLoadingStatus(false);
      })
    );
  }

  deleteCar(id: number): void {
    this.setLoadingStatus(false);
    this.http
      .delete(`${environment.apiUrlcar}/${id}`)
      .pipe(
        switchMap(() => this.cars$),
        take(1),
        map((cars) => cars.filter((car) => car.id !== id)),
        tap((cars) => {
          this._cars$.next(cars);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  // getCars(): Observable<Car[]> {
  //   this._loading = true;
  //   this.setLoadingStatus(true);
  //   return this.http.get<Car[]>(`${environment.apiUrl}/public`).pipe(
  //     delay(1000),
  //     tap(() => {
  //       console.log('THIS', this._loading);
  //       this.setLoadingStatus(false);
  //     })
  //   );
  // }
}
