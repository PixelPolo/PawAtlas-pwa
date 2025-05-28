import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Marker } from '../../models/interfaces/marker';
import { Subscription } from 'rxjs';
import { DesignService } from '../../services/design/design.service';
import { FirestorePawatlasService } from '../../services/firestore/pawatlas/firestore-pawatlas.service';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { GeoPoint } from '@angular/fire/firestore';

@Component({
  selector: 'app-marker-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './marker-details.component.html',
  styleUrl: './marker-details.component.css',
})
export class MarkerDetailsComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Input for the marker to display
  @Input() marker: Marker | null = null;

  // Output event to the parent that the details are closed
  @Output() detailsClosed = new EventEmitter<void>();

  // Output event to the parent that the marker is edited
  @Output() markerEdited = new EventEmitter<void>();

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firestorePawatlasService = inject(FirestorePawatlasService);
  private geolocationService = inject(GeolocationService);
  public designService = inject(DesignService);
  private router = inject(Router);

  // Icons
  public faThumbsUp = faThumbsUp;
  public faThumbsDown = faThumbsDown;

  // User position
  public userPosition: GeoPoint | null = null;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Get the user position
  public ngOnInit(): void {
    this.getUserPosition();
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get the user position
  public getUserPosition(): void {
    this.subscription.add(
      this.geolocationService.getUserPosition().subscribe({
        next: (position: GeoPoint) => {
          this.userPosition = position;
        },
        error: (error) => {
          console.error('Error getting user position', error);
        },
      })
    );
  }

  // ***** METHODS *****

  // Close the details
  public closeDetails(): void {
    this.detailsClosed.emit();
  }

  // Delete the marker
  public deleteMarker(): void {
    // Check if the user is the creator of the marker
    if (!this.firestorePawatlasService.isUserMarker(this.marker!)) {
      alert("Vous ne pouvez pas supprimer un lieu que vous n'avez pas créé.");
      return;
    } else {
      this.subscription.add(
        this.firestorePawatlasService.deleteMarker(this.marker!).subscribe({
          next: () => {
            this.closeDetails();
          },
          error: (error) => {
            console.log(error.message);
          },
        })
      );
    }
    // If we are offline, emit the details closed event
    if (!navigator.onLine) {
      this.closeDetails();
    }
  }

  // Edit the marker
  public editMarker(): void {
    // Check if the user is the creator of the marker
    if (!this.firestorePawatlasService.isUserMarker(this.marker!)) {
      alert("Vous ne pouvez pas modifier un lieu que vous n'avez pas créé.");
      return;
    }
    // Emit the marker to the parent
    this.markerEdited.emit();
  }

  // Approve Marker (add like)
  public approveMarker(): void {
    this.subscription.add(
      this.firestorePawatlasService.addLike(this.marker!).subscribe({
        next: () => {
          this.closeDetails();
        },
        error: (error) => {
          console.log(error.message);
        },
      })
    );
  }

  // Disapprove Marker (add dislike)
  public disapproveMarker(): void {
    this.subscription.add(
      this.firestorePawatlasService.addDislike(this.marker!).subscribe({
        next: () => {
          this.closeDetails();
        },
        error: (error) => {
          console.log(error.message);
        },
      })
    );
  }

  // Compute the distance between a marker and the user
  public computeDistance(marker: Marker): string {
    return this.geolocationService
      .computeDistance(marker, this.userPosition!)
      .toFixed(2);
  }

  // Nominatim details
  public showNominatim(): void {
    this.router.navigate(['/nominatim'], {
      queryParams: {
        lon: this.marker!.location.longitude,
        lat: this.marker!.location.latitude,
        markerID: this.marker!.id,
      },
    });
  }
}
