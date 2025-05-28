import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DesignService } from '../../../services/design/design.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
// TODO FORGOT PASSWORD (SEND EMAIL IF EMAIL EXISTS)

// https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f
export class LoginComponent implements OnDestroy, OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  public designService = inject(DesignService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Error message
  public errorMsg: string | null = null;

  // Login form for Email and Password
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

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

  // ***** AUTHENTIFICATION SUCCESS AND ERROR HANDLING *****

  // Success login
  private successLogin(): void {
    this.router.navigate(['/map']);
  }

  // Handle the error when login in with email and password
  private errorLogin(error: any): void {
    this.errorMsg = error.code;
  }

  // Handle the error when login in with social media
  private errorSocialLogin(error: any): void {
    console.log('Error logging in with social media : ', error);
  }

  // ***** AUTHENTICATION WITH EMAIL AND PASSWORD *****

  public loginSubmit() {
    // Get the the form values
    const rawForm = this.loginForm.getRawValue();
    const email = rawForm.email ?? '';
    const password = rawForm.password ?? '';
    // Call the login method from the AuthService
    this.subscription.add(
      this.authService.login(email, password).subscribe({
        next: () => {
          this.successLogin();
        },
        error: (error) => {
          this.errorLogin(error);
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
          this.successLogin();
        },
        error: (error) => {
          this.errorSocialLogin(error);
        },
      })
    );
  }

  // ***** AUTHENTICATION WITH APPLE *****

  public loginWithApple(): void {
    // Call the loginWithApple method from the AuthService
    this.subscription.add(
      this.authService.loginWithApple().subscribe({
        next: () => {
          this.successLogin();
        },
        error: (error) => {
          this.errorSocialLogin(error);
        },
      })
    );
  }

  // ***** AUTHENTICATION WITH FACEBOOK *****

  public loginWithFacebook(): void {
    // Call the loginWithFacebook method from the AuthService
    this.subscription.add(
      this.authService.loginWithFacebook().subscribe({
        next: () => {
          this.successLogin();
        },
        error: (error) => {
          this.errorSocialLogin(error);
        },
      })
    );
  }
}
