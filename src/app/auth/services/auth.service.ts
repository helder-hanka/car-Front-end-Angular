import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Profile } from '../models/profile';

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
    return this.http.post(`${environment.apiUrl}/api/auth/signup`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.authSubject.next(true);
        })
      );
  }

  registerProfile(profile: Profile): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/userProfile`, profile);
  }

  updateProfile(profile: Profile): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/userProfile/${profile.id}`,
      profile
    );
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/api/userProfile`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
}
