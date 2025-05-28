import { inject, Injectable } from '@angular/core';
import { DesignService } from '../design/design.service';
import { Marker } from '../../../models/database/marker.model';
import { BehaviorSubject } from 'rxjs';
import { MarkerService } from '../database/marker/marker.service';
import { AuthService } from '../auth/auth.service';
import { Category } from '../../../models/database/category.model';
import L from 'leaflet';
import 'leaflet.markercluster';

// Set the default image path for the markers
L.Icon.Default.imagePath = 'assets/leaflet/';

@Injectable({
  providedIn: 'root',
})
// TODO : REDUCE THE NUMBER OF MARKERS BY THE MAP BOUNDS
// TODO : REDUCE THE NUMBER OF API CALLS (MYBE SERVICE WORKER AND CACHE)
export class MapMarkerService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private designService = inject(DesignService);
  private markerService = inject(MarkerService);
  private authService = inject(AuthService);

  // Observable for adding a marker
  private isAddingMarkerSubject = new BehaviorSubject<boolean>(false);
  public isAddingMarker$ = this.isAddingMarkerSubject.asObservable();

  // Observable for showing the details of a marker
  private markerToDetailSubject = new BehaviorSubject<Marker | undefined>(
    undefined
  );
  public markerToDetail$ = this.markerToDetailSubject.asObservable();

  // Markers from Database
  private databaseMarkers: Marker[] = [];

  // User interaction
  private myMarkersChecked = false;
  private choosenCategories: Category[] = [];

  // Marker cluster
  private markerCluster = L.markerClusterGroup();

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** SETTERS *****
  // *******************

  // Set the user's choice for displaying his markers
  public setMyMarkersChecked(checked: boolean): void {
    this.myMarkersChecked = checked;
  }

  // Set the user's choice for displaying categories
  public setChoosenCategories(categories: Category[]): void {
    this.choosenCategories = categories;
  }

  // Reset the observables
  public resetObservables(): void {
    this.isAddingMarkerSubject.next(false);
    this.markerToDetailSubject.next(undefined);
  }

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ADD MARKER POPUP *****

  // Create a popup for adding a marker
  public createAddPopup(): L.Popup {
    const addPopup = L.popup();
    const button = this.createAddButton();
    addPopup.setContent(button);
    return addPopup;
  }

  // Create add button
  private createAddButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Ajouter';
    button.classList.add('add-marker-button');
    button.addEventListener('click', () => {
      this.isAddingMarkerSubject.next(true);
    });
    return button;
  }

  // ***** FORMAT MARKERS *****

  // Format a marker from Database to Leaflet
  private createMarker(marker: Marker): L.Marker {
    const newMarker = new L.Marker([marker.markerLat, marker.markerLng]);
    this.setIcon(newMarker, marker.categoryID);
    this.setPopup(newMarker, marker);
    return newMarker;
  }

  // Set the icon of the marker
  private setIcon(marker: L.Marker, category: string): void {
    marker.setIcon(this.designService.getLeafletIconURL(category));
  }

  // Set the content of the popup
  private setPopup(newMarker: L.Marker, marker: Marker): void {
    const content = document.createElement('div');
    content.innerHTML = `
    <div>
    <b>${marker.markerName}</b>
    </div>
    <div>
    Rejeté : <b>${marker.markerDisapprovedVotes}</b>
    </div>
    <div>
    Approuvé : <b>${marker.markerApprovedVotes}</b>
    </div>
    `;
    const detailButton = this.createDetailButton(marker);
    content.appendChild(detailButton);
    newMarker.bindPopup(content);
  }

  // Create detail button
  private createDetailButton(marker: Marker): HTMLButtonElement {
    const detailButton = document.createElement('button');
    detailButton.textContent = 'Détails';
    detailButton.classList.add('submit-button');
    detailButton.addEventListener('click', () => {
      this.markerToDetailSubject.next(marker);
    });
    return detailButton;
  }

  // ***** ADD MARKERS TO THE MAP *****

  // Display markers on the map
  public displayMarkers(map: L.Map): void {
    // TODO : REDUCE THE NUMBER OF MARKERS BY THE MAP BOUNDS
    // TODO : REDUCE THE NUMBER OF API CALLS (MYBE SERVICE WORKER AND CACHE)
    this.markerService.getMarkers().subscribe({
      next: (markers) => {
        this.databaseMarkers = markers;
        const markersToDisplay = this.getFilteredMarkers();
        this.addClusterToMap(map, markersToDisplay);
      },
    });
  }

  // Add a cluster to the map
  private addClusterToMap(map: L.Map, markers: Marker[]): void {
    this.markerCluster.clearLayers();
    this.markerCluster = L.markerClusterGroup({
      maxClusterRadius: 50, // Max radius of the cluster
      showCoverageOnHover: false, // Hide the bounds of the cluster on hover
      zoomToBoundsOnClick: true, // Zoom to the bounds of the cluster on click
    });
    markers.forEach((marker: Marker) => {
      this.markerCluster.addLayer(this.createMarker(marker));
    });
    map.addLayer(this.markerCluster);
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

  // ***** GO TO MARKER *****

  // Go to the marker
  public goToMarker(map: L.Map, markerID: string): void {
    const marker = this.databaseMarkers.find(
      (marker) => marker.markerID === markerID
    );
    if (marker) {
      console.log(marker);
      setTimeout(() => {
        map.setView([marker.markerLat, marker.markerLng], 18);
        this.markerCluster.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            if (
              layer.getLatLng().lat === marker.markerLat &&
              layer.getLatLng().lng === marker.markerLng
            ) {
              layer.fire('click');
            }
          }
        });
      }, 1000);
    }
  }
}
