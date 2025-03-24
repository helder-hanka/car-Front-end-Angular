import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.authUser}/signup`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.authUser}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.authSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
}
