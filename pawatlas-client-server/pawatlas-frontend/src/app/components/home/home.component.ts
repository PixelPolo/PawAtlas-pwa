import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private router = inject(Router);
  private authService = inject(AuthService);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Logout the user
  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error logging out:', error);
      },
    });
  }
}
