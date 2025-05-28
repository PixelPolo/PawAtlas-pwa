import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignService } from '../../../services/design/design.service';

@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.css',
})
// https://github.com/FortAwesome
// https://github.com/FortAwesome/angular-fontawesome
export class MenuFooterComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private router = inject(Router);
  public designService = inject(DesignService);

  // Check if the screen is mobile
  public isMobile: boolean;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {
    this.isMobile = window.innerWidth < 768;
  }

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

  public goToInterest(): void {
    this.router.navigate(['/pets']);
  }
}
