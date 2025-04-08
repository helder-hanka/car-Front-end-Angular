import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { User } from '../../models/user';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  mainForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void {
    this.mainForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', [Validators.required]],
        role: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      const user: User = {
        email: this.mainForm.value.email,
        password: this.mainForm.value.password,
        role: this.mainForm.value.role,
      };

      this.authService.register(user).subscribe({
        next: (response) => {
          this.route.navigate(['auth/login']);
        },
        error: (error) => {
          this.errorMessage = error.error
            ? error.error.error
            : 'Registration failed. Please try again.';
        },
      });
    } else {
      this.mainForm.markAllAsTouched();
    }
  }
}
