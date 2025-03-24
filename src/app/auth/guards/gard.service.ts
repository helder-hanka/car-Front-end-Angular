import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map((isAuth) => {
        if (!isAuth) {
          this.route.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
