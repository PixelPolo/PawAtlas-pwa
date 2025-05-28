import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {
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

  public goToMap(): void {
    this.router.navigate(['/map']);
  }
}
