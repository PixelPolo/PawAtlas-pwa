import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { initMap } from './map-config';
import L from 'leaflet';
import 'leaflet.markercluster';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Marker } from '../../models/interfaces/marker';
import { DesignService } from '../../services/design/design.service';
import {
  faLocationArrow,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirestorePawatlasService } from '../../services/firestore/pawatlas/firestore-pawatlas.service';
import { MapMarkerService } from '../../services/marker/map-marker.service';
import { MarkerDetailsComponent } from '../marker-details/marker-details.component';
import { MarkerFormComponent } from '../marker-form/marker-form.component';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { MarkerMenuComponent } from '../marker-menu/marker-menu.component';
import { MapSearchBarComponent } from '../map-search-bar/map-search-bar.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MarkerFormComponent,
    NgbModule,
    MarkerDetailsComponent,
    MapSearchBarComponent,
    MarkerMenuComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
// TODO - GET ONLY THE MARKERS IN THE CURRENT VIEW TO AVOID TOO MANY API CALLS

// https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f
// https://www.geeksforgeeks.org/angular-ng-bootstrap-dropdown-component/
// https://ng-bootstrap.github.io/#/components/dropdown/api
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// https://dev.to/3dayweek/how-to-get-an-accurate-position-estimate-from-the-geolocation-api-in-javascript-1njf
// https://github.com/bluehalo/ngx-leaflet-markercluster
export class MapComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firestorePawatlasService = inject(FirestorePawatlasService);
  private geoLocationService = inject(GeolocationService);
  private mapMarkerService = inject(MapMarkerService);
  public designService = inject(DesignService);
  private activatedRoute = inject(ActivatedRoute);

  // Create a map object
  public map!: L.Map;

  // Create a layer control
  private layerControl: L.Control.Layers = L.control
    .layers()
    .setPosition('bottomleft');

  // Location dots
  public faLocationArrow = faLocationArrow;
  public locationsDots: L.CircleMarker[] = [];

  // Zoom control icons
  public faPlus = faPlus;
  public faMinus = faMinus;

  // User interactivity
  public isAddingMarker: boolean = false;
  public markerDetail: Marker | null = null;
  public markerToEdit: Marker | null = null;

  // Menu interactivity
  public interestChecked: boolean = true;
  public dangerChecked: boolean = true;
  public myMarkersChecked: boolean = false;
  public choosenCategory: string[] = [];

  // Coordinates of the clicked point
  public longitude: number = 0;
  public latitude: number = 0;

  // Popup for a new marker
  private addPopup = L.popup();

  // Markers from the firestore
  private allMarkers: Marker[] = [];
  private userMarkers: Marker[] = [];

  // Marker cluster
  private markerCluster = L.markerClusterGroup();

  // Coordinates of the map bounds of the current view
  // Top left corner and bottom right corner
  public nwLat: number = 0;
  public nwLng: number = 0;
  public seLat: number = 0;
  public seLng: number = 0;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the map after the view is initialized
  public ngOnInit(): void {
    // Initialize the map with initMap from map-config.ts
    this.map = initMap('map', this.layerControl);
    // Add event listeners to the map
    this.addEventListeners();
    // Set all markers, get them from the firestore and display them
    this.setMarkers();
    // Subscribe to query params
    this.subscribeToQueryParams();
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
          this.displayMarkers();
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
          this.userMarkers = markers;
        },
        error: (error) => {
          console.error('Error getting user markers', error);
          this.displayMarkers();
        },
      })
    );
  }

  // Subscribe to query params
  private subscribeToQueryParams(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        const markerId = params['markerId'];
        if (markerId) {
          this.onMarkerFromQueryParams(markerId);
        }
      })
    );
  }

  // ***** MAP EVENT LISTENERS *****

  // Add event listeners to the map to add a marker
  private addEventListeners(): void {
    this.onMapZoomEnd();
    this.onMapMoveEnd();
    this.onMapClick();
  }

  // On zoomend event
  private onMapZoomEnd(): void {
    this.map.on('zoomend', () => {
      this.displayMarkers();
    });
  }

  // On moveend event
  private onMapMoveEnd(): void {
    this.map.on('moveend', () => {
      // this.getBounds();
      // this.logBounds();
    });
  }

  // On click event
  private onMapClick(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.longitude = e.latlng.lng;
      this.latitude = e.latlng.lat;
      this.showAddPopup();
    });
  }

  // Show a popup to add a marker
  private showAddPopup(): void {
    // Create a popup
    this.addPopup = L.popup().setLatLng([
      Number(this.latitude),
      Number(this.longitude),
    ]);
    // Create a button for the popup
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-success', 'btn-sm');
    button.textContent = 'Ajouter';
    // Add the button to the popup
    this.addPopup.setContent(button).openOn(this.map);
    // Add an event listener to the button
    button.addEventListener('click', () => {
      // Open the form to add a marker
      this.isAddingMarker = true;
    });
  }

  // NOT USED YET
  private getBounds(): void {
    const bounds = this.map.getBounds();
    this.nwLat = bounds.getNorthWest().lat;
    this.nwLng = bounds.getNorthWest().lng;
    this.seLat = bounds.getSouthEast().lat;
    this.seLng = bounds.getSouthEast().lng;
  }

  // NOT USED YET
  private logBounds(): void {
    console.log('nwLat', this.nwLat);
    console.log('nwLng', this.nwLng);
    console.log('seLat', this.seLat);
    console.log('seLng', this.seLng);
  }

  // ***** MARKER'S EVENT LISTENERS *****

  // Create a marker and add the popup event listener
  private createMarker(marker: Marker): L.Marker {
    const newMarker = this.mapMarkerService.createMarker(marker, this.map);
    this.addPopupEventsListener(newMarker, marker);
    return newMarker;
  }

  // Add an event listener on marker's popup buttons
  private addPopupEventsListener(newMarker: L.Marker, marker: Marker): void {
    // Add an event listener to the popup details button
    newMarker.on('popupopen', () => {
      const popupButton = document.querySelector('.detailButton');
      popupButton?.addEventListener('click', () => {
        // Set the marker to see the details
        this.markerDetail = marker;
        newMarker.closePopup();
      });
    });
  }

  // ***** COMPONENTS EVENTS *****

  // On my marker change event
  public onMyMarkersChange(bool: boolean): void {
    this.myMarkersChecked = bool;
    this.displayMarkers();
  }

  // On interests change event
  public onInterestsChange(bool: boolean): void {
    this.interestChecked = bool;
    this.displayMarkers();
  }

  // On dangers change event
  public onDangersChange(bool: boolean): void {
    this.dangerChecked = bool;
    this.displayMarkers();
  }

  // On category changed event
  public onCategoryChanged(categories: string[]): void {
    this.choosenCategory = categories;
    this.displayMarkers();
  }

  // On locate me event
  public onLocateMe(): void {
    this.subscription.add(
      this.geoLocationService.getUserPosition().subscribe({
        next: (position) => {
          // Remove the previous location dots
          this.locationsDots.forEach((dot) => {
            this.map.removeLayer(dot);
          });
          // Create new location dots
          this.locationsDots = this.geoLocationService.createLocationDot(
            this.map,
            position.latitude,
            position.longitude
          );
          // Add the location dots to the map
          this.locationsDots.forEach((dot) => {
            dot.addTo(this.map);
          });
        },
        error: (error) => {
          console.error('Error getting user position', error);
        },
      })
    );
  }

  // On form closed event
  public onFormClosed(): void {
    this.isAddingMarker = false;
    this.markerToEdit = null;
    this.map.closePopup(this.addPopup);
  }

  // On close details event
  public onCloseDetails(): void {
    this.markerDetail = null;
    this.displayMarkers();
  }

  // On edit marker event
  public onMarkerEdited(): void {
    this.markerToEdit = this.markerDetail;
    this.markerDetail = null;
  }

  // Create a marker from query params and open its popup
  private onMarkerFromQueryParams(markerId: string): void {
    const marker = this.allMarkers.find((m) => m.id === markerId);
    if (marker) {
      // Set the view to the marker's position after 1 sec
      setTimeout(() => {
        this.map.setView(
          [marker.location.latitude, marker.location.longitude],
          16
        );
        // Create a marker and open its popup after 1 sec
        this.createMarker(marker).addTo(this.map).openPopup();
      }, 1000);
    }
  }

  // ***** DISPLAY MARKERS *****

  // Display markers according to the boolean values
  private displayMarkers(): void {
    // Remove all markers from the map
    this.mapMarkerService.removeAllMarkers(this.map);
    // Get the markers according to the filter menu
    let markersToDisplay = this.getMarkerSourceAccordingFilterMenu();
    // Add cluster to the map
    this.addClusterToMap(markersToDisplay);
    // Add markers without cluster
    // this.addMarkersWithoutCluster(markersToDisplay);
  }

  // ***** DISPLAY MARKERS WITH CLUSTER *****

  // Add a cluster to the map
  private addClusterToMap(markersToDisplay: Marker[]): void {
    // Clear the map before adding the markers
    this.markerCluster.clearLayers();
    // Create a marker cluster group and add markers to it
    this.markerCluster = L.markerClusterGroup({
      maxClusterRadius: 50, // Max radius of the cluster
      showCoverageOnHover: false, // Hide the bounds of the cluster on hover
      zoomToBoundsOnClick: true, // Zoom to the bounds of the cluster on click
    });
    markersToDisplay.forEach((marker: Marker) => {
      this.markerCluster.addLayer(this.createMarker(marker));
    });
    // Add the marker cluster to the map
    this.map.addLayer(this.markerCluster);
  }

  // ***** DISPLAY MARKERS WITHOUT CLUSTER, SORTED BY LIKES AND ZOOM : NOT USED *****

  // Add markers to the map without cluster
  private addMarkersWithoutCluster(markersToDisplay: Marker[]): void {
    // Get the markers according to the likes and the current zoom
    markersToDisplay = this.getMarkersAccordingToLikesAndZoom(markersToDisplay);
    // Add markers to the map and add event listeners
    markersToDisplay.forEach((marker: Marker) => {
      this.createMarker(marker).addTo(this.map);
    });
  }

  // Get the markers source according to the filter menu
  private getMarkerSourceAccordingFilterMenu(): Marker[] {
    const markersSource = this.myMarkersChecked
      ? this.userMarkers
      : this.allMarkers;
    return markersSource.filter(
      (marker) =>
        this.choosenCategory.includes(marker.category) &&
        ((this.interestChecked && marker.type === 'interest') ||
          (this.dangerChecked && marker.type === 'danger'))
    );
  }

  // Filter markers according to the likes and the current zoom
  private getMarkersAccordingToLikesAndZoom(markerSource: Marker[]): Marker[] {
    const zoomLevel = this.map.getZoom();
    if (zoomLevel <= 4) {
      return markerSource.filter((marker) => marker.approvedVotes >= 4);
    } else if (zoomLevel <= 6) {
      return markerSource.filter((marker) => marker.approvedVotes >= 3);
    } else if (zoomLevel <= 8) {
      return markerSource.filter((marker) => marker.approvedVotes >= 2);
    } else if (zoomLevel <= 10) {
      return markerSource.filter((marker) => marker.approvedVotes >= 1);
    } else {
      return markerSource;
    }
  }
}
