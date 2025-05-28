import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.css',
})
export class MenuFooterComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private router = inject(Router);
  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  public goToHome(): void {
    this.router.navigate(['/home']);
  }

  public goToList(): void {
    this.router.navigate(['/list']);
  }

  public goToMap(): void {
    this.router.navigate(['/map']);
  }

  public goToPets(): void {
    this.router.navigate(['/animals']);
  }

  public goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
