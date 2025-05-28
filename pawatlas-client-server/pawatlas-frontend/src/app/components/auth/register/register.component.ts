import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
// TODO EMAIL CONFIRMATION
// TODO HASH THE PASSWORD ?
// TODO TERMS AND CONDITIONS COMPONENT
export class RegisterComponent implements OnDestroy, OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private authService = inject(AuthService);
  private router = inject(Router);

  // Password pattern for the form
  private passwordPattern =
    '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*\'"]+)$';

  // Custom validator to check if password and passwordConfirm match
  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    return password?.value !== passwordConfirm?.value
      ? { passwordMismatch: true }
      : null;
  };

  // Error message
  public errorMsg: string | null = null;

  // Register form
  public registerForm = new FormGroup(
    {
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordPattern),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordPattern),
      ]),
      iAgree: new FormControl('', [Validators.requiredTrue]),
    },
    { validators: this.passwordMatchValidator }
  );

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Check if the user is already logged in
  public async ngOnInit(): Promise<void> {
    if (await this.authService.isLogged()) {
      this.router.navigate(['/map']);
    }
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** REGISTRATION SUCCESS AND ERROR HANDLING *****

  // Success login
  private successRegistration(): void {
    this.router.navigate(['/map']);
  }

  // Handle the error when login in with email and password
  private errorRegistration(error: any): void {
    // Generic error message
    this.errorMsg = error.message;
    // Check if the error is a display name already in use
    if (error.message === 'auth/displayname-already-exists') {
      this.errorMsg = "Nom d'utilisateur déjà utilisé";
    }
    // Check if the error is an email already in use
    if (error.message === 'auth/email-already-in-use') {
      this.errorMsg = 'Email déjà utilisé';
    }
    // Check if the error is an invalid email
    if (error.code === 'auth/invalid-email') {
      this.errorMsg = 'Email invalide';
    }
    // Check if the error is a invalid password
    if (error.code === 'auth/invalid-password') {
      this.errorMsg = 'Mot de passe invalide';
    }
  }

  // Handle the error when login in with social media
  private errorSocialLogin(error: any): void {
    console.log('Error login in with social media : ', error);
  }

  // ***** REGISTER WITH EMAIL AND PASSWORD *****

  public registerSubmit() {
    // Disable the submit button to avoid multiple clicks
    this.registerForm.disable();
    // Get the values from the form
    const rawForm = this.registerForm.getRawValue();
    const email = rawForm.email ?? '';
    const displayName = rawForm.displayName ?? '';
    const password = rawForm.password ?? '';
    // Call the register method from the AuthService
    this.subscription.add(
      this.authService.register(displayName, email, password).subscribe({
        next: () => {
          this.successRegistration();
        },
        error: (error) => {
          this.errorRegistration(error);
          this.registerForm.enable();
        },
      })
    );
  }

  // ***** AUTHENTICATION WITH GOOGLE *****

  public loginWithGoogle(): void {
    // Call the loginWithGoogle method from the AuthService
    this.subscription.add(
      this.authService.loginWithGoogle().subscribe({
        next: () => {
          this.successRegistration();
        },
        error: (error) => {
          this.errorSocialLogin(error);
        },
      })
    );
  }

  // ***** AUTHENTICATION WITH APPLE *****

  // Login with Apple
  public loginWithApple(): void {
    // Call the loginWithApple method from the AuthService
    this.authService.loginWithApple();
  }

  // ***** AUTHENTICATION WITH FACEBOOK *****

  // Login with Facebook
  public loginWithFacebook(): void {
    // Call the loginWithFacebook method from the AuthService
    this.authService.loginWithFacebook();
  }
}
