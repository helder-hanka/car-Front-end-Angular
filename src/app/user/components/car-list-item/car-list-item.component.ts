import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Car } from '../../../cars/models/car';

@Component({
  selector: 'app-car-list-item',
  imports: [CommonModule, SharedModule, MatToolbarModule, RouterLink],
  templateUrl: './car-list-item.component.html',
  styleUrl: './car-list-item.component.scss',
})
export class CarListItemComponent {
  @Input() postCar!: Car;
}
