import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from observables
  private subscription: Subscription = new Subscription();

  // Services
  private spinnerService = inject(SpinnerService);

  // Loading state
  public isLoading = false;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the component
  public ngOnInit(): void {
    this.subscribeToObservables();
  }

  // Subscribe to observables
  private subscribeToObservables(): void {
    // Subscribe to the spinner service
    this.subscription.add(
      this.spinnerService.loading$.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      })
    );
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
