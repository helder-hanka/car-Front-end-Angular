import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CarService } from '../../../cars/services/car.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Car } from '../../../cars/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  imports: [SharedModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss',
})
export class UpdateCarComponent implements OnInit {
  loding$!: Observable<boolean>;
  car$!: Observable<Car>;
  mainForm!: FormGroup;
  successMsg: string = '';
  errorMessage: string = '';
  loadingGetCar: boolean = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initObservable();
    this.initMainForm();
    this.initGetcar();
  }

  private initObservable() {
    this.loding$ = this.carService.loading$;
    this.car$ = this.route.params.pipe(
      switchMap((params) => this.carService.getUserCarById(+params['id']))
    );
  }

  private initGetcar() {
    this.loadingGetCar = true;
    this.car$.subscribe({
      next: (res) => {
        if (res) {
          this.mainForm.patchValue({
            ...res,
            color: res.color.color,
            nomGarage: res.garage.nom,
            adresseGarage: res.garage.adresse,
            telephoneGarage: res.garage.telephone,
          });
          this.loadingGetCar = false;
        }
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error ||
          'Une erreur est survenue lors de la récupération du profil.';
        this.errorMessage = '';
        this.successMsg = '';
        this.loadingGetCar = false;
      },
    });
  }

  private initMainForm() {
    this.mainForm = this.fb.group({
      id: [''],
      immatriculation: [, [Validators.required]],
      modele: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      color: ['', [Validators.required]],
      annee: ['', [Validators.required]],
      nomGarage: ['', [Validators.required]],
      adresseGarage: ['', [Validators.required]],
      telephoneGarage: ['', [Validators.required]],
    });
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      this.loadingGetCar = true;
      const car: Car = this.mainForm.value;
      this.carService.updatedCar(car).subscribe({
        next: (updateCar) => {
          if (updateCar) {
            this.mainForm.patchValue({
              ...updateCar,
              color: updateCar.color.color,
              nomGarage: updateCar.garage.nom,
              adresseGarage: updateCar.garage.adresse,
              telephoneGarage: updateCar.garage.telephone,
            });
          }
          this.successMsg = 'Voiture mise à jour avec succès !';
          this.errorMessage = '';
          this.loadingGetCar = false;
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.error ||
            'Une erreur est survenue lors de la mise à jour du profil.';
          this.successMsg = '';
          this.loadingGetCar = false;
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.successMsg = '';
    }
  }

  onGoBack() {
    this.location.back();
  }
}
