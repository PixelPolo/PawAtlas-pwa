import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // ******************
  // ***** FIELDS *****
  // ******************
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Show the spinner
  public show() {
    this.loadingSubject.next(true);
  }

  // Hide the spinner
  public hide() {
    this.loadingSubject.next(false);
  }
}
