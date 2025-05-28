import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MarkerMenuComponent } from '../marker-menu/marker-menu.component';
import { Subscription } from 'rxjs';
import { GeoPoint } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MarkerService } from '../../../services/database/marker/marker.service';
import { ImageService } from '../../../services/database/image/image.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { Category } from '../../../../models/database/category.model';
import { Marker } from '../../../../models/database/marker.model';
import { Image } from '../../../../models/database/image.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-marker-list',
  standalone: true,
  imports: [MarkerMenuComponent, DatePipe],
  templateUrl: './marker-list.component.html',
  styleUrl: './marker-list.component.css',
})
export class MarkerListComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private authService = inject(AuthService);
  private markerService = inject(MarkerService);
  private imageService = inject(ImageService);
  private geolocationService = inject(GeolocationService);
  private router = inject(Router);

  // User interaction
  private myMarkersChecked = false;
  private choosenCategories: Category[] = [];

  // User position
  private userPosition: GeoPoint | undefined;

  // Markers
  public databaseMarkers: Marker[] = [];
  public filteredMarkers: Marker[] = [];

  // Images map
  public markerImages: { [key: string]: string } = {};

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
    this.getMarkers();
    this.getUserPosition();
  }

  // Get the markers from the database
  private getMarkers(): void {
    this.subscription.add(
      this.markerService.getMarkers().subscribe({
        next: (markers: Marker[]) => {
          this.databaseMarkers = markers;
          this.filteredMarkers = this.getFilteredMarkers();
        },
      })
    );
  }

  // Get the user's position
  private getUserPosition(): void {
    this.subscription.add(
      this.geolocationService.getUserPosition().subscribe({
        next: (position: GeoPoint) => {
          this.userPosition = position;
        },
      })
    );
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** FILTER MARKERS *****

  // Filter the markers according to the user's choices
  private getFilteredMarkers(): Marker[] {
    let markers = this.getMarkerSource();
    markers = markers.filter((marker) =>
      this.choosenCategories.some(
        (category) => category.categoryID === marker.categoryID
      )
    );
    this.getMarkersImages(markers);
    return markers;
  }

  // Get the marker source if the user has selected its own markers
  private getMarkerSource(): Marker[] {
    if (this.myMarkersChecked) {
      return this.databaseMarkers.filter(
        (marker) => marker.userID === this.authService.getCurrentUserId()
      );
    } else {
      return this.databaseMarkers;
    }
  }

  // Get the marker's image
  public getMarkersImages(markers: Marker[]): void {
    for (const marker of markers) {
      if (marker.imageID) {
        this.subscription.add(
          this.imageService.getImage(marker.imageID!).subscribe({
            next: (image: Image) => {
              this.markerImages[marker.markerID!] =
                this.imageService.createURL(image);
            },
          })
        );
      }
    }
  }

  // ***** LIST HELPERS *****

  // Get the marker's category name
  public getCategoryName(categoryID: string): string {
    let name = '';
    this.choosenCategories.find((category) => {
      if (category.categoryID === categoryID) {
        name = category.categoryName;
      }
    });
    return name;
  }

  // Compute the distance between a marker and the user
  public computeDistance(marker: Marker): string {
    if (this.userPosition) {
      return this.geolocationService
        .computeDistance(marker, this.userPosition)
        .toFixed(2);
    } else {
      return 'N/A';
    }
  }

  // Sort by date
  public onSortByDate() {
    this.filteredMarkers.sort((a, b) => {
      const dateA = new Date(a.markerDate!);
      const dateB = new Date(b.markerDate!);
      return dateA.getTime() - dateB.getTime();
    });
  }

  // Sort by distance
  public onSortByDistance() {
    this.filteredMarkers.sort((a, b) => {
      const distanceA = Number(this.computeDistance(a));
      const distanceB = Number(this.computeDistance(b));
      return distanceA - distanceB;
    });
  }

  // Sort by like
  public onSortByLike() {
    this.filteredMarkers.sort((a, b) => {
      return b.markerApprovedVotes! - a.markerApprovedVotes!;
    });
  }

  // On redirect to map event
  public onRedirectToMap(marker: Marker): void {
    this.router.navigate(['/map'], {
      queryParams: { markerId: marker.markerID },
    });
  }

  // ***** MARKER MENU EVENTS *****

  // On my markers check event
  public onMyMarkersChange($event: boolean) {
    this.myMarkersChecked = $event;
    this.filteredMarkers = this.getFilteredMarkers();
  }

  // On category change event
  public onCategoryChange($event: Category[]): void {
    this.choosenCategories = $event;
    this.filteredMarkers = this.getFilteredMarkers();
  }
}
