import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestorePawatlasService } from '../../services/firestore/pawatlas/firestore-pawatlas.service';
import { DesignService } from '../../services/design/design.service';
import { Router } from '@angular/router';
import { Marker } from '../../models/interfaces/marker';
import { GeoPoint } from '@angular/fire/firestore';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { MarkerFormComponent } from '../marker-form/marker-form.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { dangerCategories, interestCategories } from '../../models/categories';
import { MarkerMenuComponent } from "../marker-menu/marker-menu.component";

@Component({
  selector: 'app-marker-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MarkerFormComponent,
    FormsModule,
    NgbModule,
    MarkerMenuComponent
],
  templateUrl: './marker-list.component.html',
  styleUrl: './marker-list.component.css',
})
export class MarkerListComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firestorePawatlasService = inject(FirestorePawatlasService);
  private geolocationService = inject(GeolocationService);
  public designService = inject(DesignService);
  private router = inject(Router);

  // User position
  public userPosition: GeoPoint | null = null;

  // Markers from the firestore
  public allMarkers: Marker[] = [];
  public allUserMarkers: Marker[] = [];
  public dangerCategories = dangerCategories;
  public interestCategories = interestCategories;
  public choosenCategory: string[] = [];

  // Markers to display
  public markersToDisplay: Marker[] = [];

  // Boolean to track user filters
  public myMarkersChecked: boolean = false;
  public interestChecked: boolean = true;
  public dangerChecked: boolean = true;
  public sortByDateChecked: boolean = false;
  public sortByDistanceChecked: boolean = false;
  public sortByLikeChecked: boolean = false;
  public sortByDislikeChecked: boolean = false;

  // Clicked marker
  public clickedMarker: Marker | null = null;

  // Boolean to show the edit form
  public showMarkerForm = false;

  // Icons
  public faThumbsDown = faThumbsDown;
  public faThumbsUp = faThumbsUp;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // ******************
  // ***** METHODS *****
  // ******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the component
  public ngOnInit(): void {
    // Set the markers
    this.setMarkers();
    // Get the user position
    this.getUserPosition();
    // Display all categories
    this.toogleAllCategories();
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get all markers from the firestore
  private setMarkers(): void {
    // All markers
    this.subscription.add(
      this.firestorePawatlasService.allMarkers$.subscribe({
        next: (markers: Marker[]) => {
          this.allMarkers = markers;
          // By default, display all markers and sort by date
          this.markersToDisplay = this.allMarkers;
          this.sortByDate();
        },
        error: (error) => {
          console.error('Error getting markers', error);
        },
      })
    );
    // User markers
    this.subscription.add(
      this.firestorePawatlasService.userMarkers$.subscribe({
        next: (markers: Marker[]) => {
          this.allUserMarkers = markers;
        },
        error: (error) => {
          console.error('Error getting user markers', error);
        },
      })
    );
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

  // Display all categories
  private toogleAllCategories(): void {
    this.interestCategories.forEach((category) => {
      this.choosenCategory.push(category.value);
    });
    this.dangerCategories.forEach((category) => {
      this.choosenCategory.push(category.value);
    });
  }

  // ***** OTHER METHODS *****

  // Compute the distance between a marker and the user
  public computeDistance(marker: Marker): string {
    return this.geolocationService
      .computeDistance(marker, this.userPosition!)
      .toFixed(2);
  }

  // Sort markers by date
  public sortByDate() {
    this.sortByDistanceChecked = false;
    this.sortByLikeChecked = false;
    this.sortByDislikeChecked = false;
    this.sortByDateChecked = !this.sortByDateChecked;
    this.markersToDisplay.sort((a, b) => {
      return b.date!.toMillis() - a.date!.toMillis();
    });
  }

  // Sort markers by distance
  public sortByDistance() {
    this.sortByDateChecked = false;
    this.sortByLikeChecked = false;
    this.sortByDislikeChecked = false;
    this.sortByDistanceChecked = !this.sortByDistanceChecked;
    this.markersToDisplay.sort((a, b) => {
      const distanceA = Number(this.computeDistance(a));
      const distanceB = Number(this.computeDistance(b));
      return distanceA - distanceB;
    });
  }

  // Sort markers by like
  public sortByLike() {
    this.sortByDateChecked = false;
    this.sortByDistanceChecked = false;
    this.sortByDislikeChecked = false;
    this.sortByLikeChecked = !this.sortByLikeChecked;
    this.markersToDisplay.sort((a, b) => {
      return b.approvedVotes - a.approvedVotes;
    });
  }

  // Sort markers by dislike
  public sortByDislike() {
    this.sortByLikeChecked = false;
    this.sortByDislikeChecked = !this.sortByDislikeChecked;
    this.markersToDisplay.sort((a, b) => {
      return b.disapprovedVotes - a.disapprovedVotes;
    });
  }

  // Get the markers source according to the filter menu
  private getMarkerSourceAccordingFilterMenu(): Marker[] {
    const markersSource = this.myMarkersChecked
      ? this.allUserMarkers
      : this.allMarkers;
    return markersSource.filter(
      (marker) =>
        this.choosenCategory.includes(marker.category) &&
        ((this.interestChecked && marker.type === 'interest') ||
          (this.dangerChecked && marker.type === 'danger'))
    );
  }

  // On my marker change event
  public onMyMarkersChange(bool: boolean): void {
    this.myMarkersChecked = bool;
    this.displayMarkersAccordingFilterMenu();
  }

  // On interests change event
  public onInterestsChange(bool: boolean): void {
    this.interestChecked = bool;
    this.displayMarkersAccordingFilterMenu();
  }

  // On dangers change event
  public onDangersChange(bool: boolean): void {
    this.dangerChecked = bool;
    this.displayMarkersAccordingFilterMenu();
  }

  // On category changed event
  public onCategoryChanged(categories: string[]): void {
    this.choosenCategory = categories;
    this.displayMarkersAccordingFilterMenu();
  }

  // Display the markers according to the filter menu
  public displayMarkersAccordingFilterMenu(): void {
    this.markersToDisplay = this.getMarkerSourceAccordingFilterMenu();
  }

  // Click on a marker card
  public onCardClick(marker: Marker): void {
    if (this.clickedMarker?.id === marker.id) {
      this.clickedMarker = null;
    } else {
      this.clickedMarker = marker;
    }
  }

  // Delete marker
  public deleteMarker(): void {
    if (this.clickedMarker) {
      // Check if the user is the creator of the marker
      if (!this.firestorePawatlasService.isUserMarker(this.clickedMarker!)) {
        alert("Vous ne pouvez pas supprimer un lieu que vous n'avez pas créé.");
        return;
      } else {
        this.subscription.add(
          this.firestorePawatlasService
            .deleteMarker(this.clickedMarker)
            .subscribe({
              next: () => {
                console.log('Marker deleted');
                this.clickedMarker = null;
              },
              error: (error) => {
                console.log(error.message);
              },
            })
        );
      }
    }
  }

  // Edit marker
  public onEditMarker(): void {
    // Check if the user is the creator of the marker
    if (this.clickedMarker) {
      if (!this.firestorePawatlasService.isUserMarker(this.clickedMarker!)) {
        alert("Vous ne pouvez pas supprimer un lieu que vous n'avez pas créé.");
        return;
      } else {
        this.showMarkerForm = true;
      }
    }
  }

  // On map popup
  public onMapPopup(marker: Marker): void {
    // Redirect to the map with the marker as a query parameter
    this.router.navigate(['/map'], { queryParams: { markerId: marker.id } });
  }

  // Close the form to edit the marker
  public onFormClosed(): void {
    this.showMarkerForm = false;
  }
}
