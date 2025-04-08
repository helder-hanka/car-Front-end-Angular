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
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _cars$ = new BehaviorSubject<Car[]>([]);
  get cars$(): Observable<Car[]> {
    return this._cars$.asObservable();
  }

  private _userCars$ = new BehaviorSubject<Car[]>([]);
  get userCars$(): Observable<Car[]> {
    return this._userCars$.asObservable();
  }

  private lastCarsLoad = 0;
  private lastUserCarsLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getCars() {
    if (Date.now() - this.lastCarsLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Car[]>(`${environment.apiUrl}/voiture/public`)
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

  getUserCars() {
    if (Date.now() - this.lastUserCarsLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Car[]>(`${environment.apiUrl}/api/user/cars`)
      .pipe(
        delay(1000),
        // map((cars) => {
        //   return cars.map((car) => {
        //     if (!car.imageUrl) {
        //       return {
        //         ...car,
        //         imageUrl:
        //           'https://cdn.pixabay.com/photo/2012/04/12/23/48/car-30990_640.png',
        //       };
        //     }
        //     return car;
        //   });
        // }),
        tap((userCars) => {
          this.lastUserCarsLoad = Date.now();
          this._userCars$.next(userCars);
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
  getUserCarById(id: number): Observable<Car> {
    if (!this.lastUserCarsLoad) {
      this.getUserCars();
    }
    return this.userCars$.pipe(
      map((cars) => cars.filter((car) => car.id === id)[0])
    );
  }

  addCar(car: Car): Observable<Car> {
    this.setLoadingStatus(true);
    return this.http
      .post<Car>(`${environment.apiUrl}/voiture/create`, car)
      .pipe(
        tap((addedCar) => {
          this.lastUserCarsLoad = +400000;
          this.setLoadingStatus(false);
        })
      );
  }

  updatedCar(car: Car): Observable<Car> {
    this.setLoadingStatus(true);
    return this.http
      .put<Car>(`${environment.apiUrl}/voiture/${car.id}`, car)
      .pipe(
        tap((updateCar) => {
          const currentCars = this._userCars$.value.map((car) =>
            car.id === updateCar.id ? updateCar : car
          );
          this._userCars$.next(currentCars);
          this.setLoadingStatus(false);
        })
      );
  }

  deleteCar(id: number): Observable<void> {
    this.setLoadingStatus(true);
    return this.http.delete<void>(`${environment.apiUrl}/voiture/${id}`).pipe(
      tap(() => {
        const currentCars = this._userCars$.value.filter(
          (car) => car.id !== id
        );
        this._userCars$.next(currentCars);
        this.setLoadingStatus(false);
      })
    );
  }
}
