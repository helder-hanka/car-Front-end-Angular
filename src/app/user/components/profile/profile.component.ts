import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Profile } from '../../../auth/models/profile';
import { delay } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  mainForm!: FormGroup<any>;
  loading: boolean = false;
  errorMessage!: string;
  successMsg: String = '';
  isExistProfile: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initMainForm();
    this.iniTGetProfile();
  }

  private iniTGetProfile() {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (res) => {
        const profil: Profile = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
        };
        this.mainForm.patchValue(profil);
        this.isExistProfile = true;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error ||
          'Une erreur est survenue lors de la récupération du profil.';

        this.successMsg = '';
        this.isExistProfile = false;
        this.loading = false;
      },
    });
  }

  private initMainForm() {
    this.mainForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      this.loading = true;
      const profile: Profile = {
        id: this.mainForm.value.id,
        firstName: this.mainForm.value.firstName,
        lastName: this.mainForm.value.lastName,
      };
      if (this.isExistProfile) {
        this.authService
          .updateProfile(profile)
          .pipe(delay(3000))
          .subscribe({
            next: (res) => {
              this.successMsg = res?.message
                ? res.message
                : 'Profil mis à jour avec succès.';
              this.errorMessage = '';
              this.loading = false;
              this.iniTGetProfile();
            },
            error: (err) => {
              this.errorMessage =
                err?.error?.error ||
                'Une erreur est survenue lors de la mise à jour du profil.';
              this.successMsg = '';
              this.loading = false;
            },
          });
      } else {
        this.authService.registerProfile(profile).subscribe({
          next: (res) => {
            this.successMsg = 'Profil sauvegarder avec succès.';
            this.errorMessage = '';
            this.loading = false;
            this.iniTGetProfile();
          },
          error: (err) => {
            this.errorMessage =
              err?.error?.error ||
              'Une erreur est survenue lors de la mise à jour du profil.';
            this.successMsg = '';
            this.loading = false;
          },
        });
      }
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.successMsg = '';
    }
  }
}
