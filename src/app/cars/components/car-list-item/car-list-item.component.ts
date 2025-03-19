import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-list-item',
  imports: [CommonModule, SharedModule, MatToolbarModule, RouterLink],
  templateUrl: './car-list-item.component.html',
  styleUrl: './car-list-item.component.scss',
})
export class CarListItemComponent implements OnInit {
  @Input() postCar!: Car;

  ngOnInit(): void {}
}
