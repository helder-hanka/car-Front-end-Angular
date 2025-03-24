import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isAuth$!: Observable<boolean>;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.initIsloginUser();
  }

  private initIsloginUser() {
    this.isAuth$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }
}
