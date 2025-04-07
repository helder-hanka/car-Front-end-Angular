import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { Car } from '../../../cars/models/car';
import { Observable, switchMap } from 'rxjs';
import { CarService } from '../../../cars/services/car.service';

@Component({
  selector: 'app-single-car',
  imports: [SharedModule, AsyncPipe, SharedModule, RouterLink],
  templateUrl: './single-car.component.html',
  styleUrl: './single-car.component.scss',
})
export class SingleCarComponent implements OnInit {
  loading$!: Observable<boolean>;
  car$!: Observable<Car>;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable() {
    this.loading$ = this.loading$;

    this.car$ = this.route.params.pipe(
      switchMap((params) => this.carService.getUserCarById(+params['id']))
    );
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: () => {
        this.snackBar.open(
          'La voiture a été supprimée avec succès.',
          'Fermer',
          {
            duration: 3000,
          }
        );
        this.router.navigate(['/user/cars']);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la voiture:', err);
        this.snackBar.open(
          'Une erreur est survenue lors de la suppression de la voiture.',
          'Fermer',
          {
            duration: 5000,
          }
        );
      },
    });
  }
}
