import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
