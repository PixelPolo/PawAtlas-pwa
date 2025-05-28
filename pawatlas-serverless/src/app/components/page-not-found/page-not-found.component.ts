import { Component, inject } from '@angular/core';
import { DesignService } from '../../services/design/design.service';

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
  public designService = inject(DesignService);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************
}
