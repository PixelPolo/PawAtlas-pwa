import { Component } from '@angular/core';
import { WeightFormComponent } from '../forms/animal-forms/weight-form/weight-form.component';
import { VeterinarianFormComponent } from '../forms/animal-forms/veterinarian-form/veterinarian-form.component';
import { AnimalFormComponent } from '../forms/animal-forms/animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [
    WeightFormComponent,
    VeterinarianFormComponent,
    AnimalFormComponent,
    AnimalListComponent,
  ],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css',
})
export class AnimalComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // TODO ... MAYBE GRAPH OR STUFF LIKE THAT

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************
}
