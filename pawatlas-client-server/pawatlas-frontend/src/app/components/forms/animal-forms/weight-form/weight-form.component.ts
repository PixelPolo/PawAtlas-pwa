import { Component, inject, Input } from '@angular/core';
import { WeightService } from '../../../../services/database/weight/weight.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Weight } from '../../../../../models/database/weight.model';

@Component({
  selector: 'app-weight-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './weight-form.component.html',
  styleUrl: './weight-form.component.css',
})
export class WeightFormComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Animal ID input
  @Input() animalID!: string;

  // Services
  private weightService = inject(WeightService);

  // New weight form
  public newWeightForm = new FormGroup({
    date: new FormControl(''),
    weight: new FormControl(''),
  });

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** FORM SUBMISSION *****

  // Method to submit the form, should be called by a parent component
  public submitForm(): Observable<Weight | undefined> {
    if (this.newWeightForm.pristine) return of(undefined);
    const date = this.newWeightForm.get('date')?.value;
    const value = this.newWeightForm.get('weight')?.value;
    if (!date || !value) return of(undefined);
    const weight: Weight = {
      weightDate: new Date(date),
      weightValue: Number(value),
      animalID: this.animalID,
    };
    return this.weightService.createWeight(weight);
  }
}
