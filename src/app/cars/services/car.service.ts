import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
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
    return this.cars$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === id)[0]
      )
    );
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
