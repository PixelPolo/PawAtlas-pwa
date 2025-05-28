import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { initMap } from './map.config';
import { Marker } from '../../../models/database/marker.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MarkerFormComponent } from '../forms/marker-form/marker-form.component';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { MapMarkerService } from '../../services/map/map-marker.service';
import { Category } from '../../../models/database/category.model';
import { ActivatedRoute } from '@angular/router';
import { MarkerMenuComponent } from '../marker/marker-menu/marker-menu.component';
import { MarkerDetailsComponent } from '../marker/marker-details/marker-details.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MarkerFormComponent, MarkerMenuComponent, MarkerDetailsComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from observables
  private subscription: Subscription = new Subscription();

  // Services
  private geolocationService = inject(GeolocationService);
  private mapMarkerService = inject(MapMarkerService);
  private activatedRoute = inject(ActivatedRoute);

  // Map object
  public map!: L.Map;

  // Layer control
  public layerControl: L.Control.Layers = L.control
    .layers()
    .setPosition('bottomleft');

  // Location dots
  public locationsDots: L.CircleMarker[] = [];

  // Coordinates of the clicked point
  public longitude = 0;
  public latitude = 0;

  // User interactivity
  public isAddingMarker = false;
  public markerToDetail: Marker | undefined = undefined;
  public markerToEdit: Marker | undefined = undefined;
  private addPopup = L.popup();

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the map and subscribe to query params
  public ngOnInit(): void {
    this.map = initMap('map', this.layerControl); // from map.config.ts
    this.subscribeToObservables();
    this.subscribeToQueryParams();
    this.addEventListeners();
  }

  // Subscribe to observables
  public subscribeToObservables(): void {
    // Subscribe to the showMarkerForm observable
    this.subscription.add(
      this.mapMarkerService.isAddingMarker$.subscribe((value) => {
        this.isAddingMarker = value;
      })
    );
    // Subscribe to the showMarkerDetail observable
    this.subscription.add(
      this.mapMarkerService.markerToDetail$.subscribe((marker) => {
        this.markerToDetail = marker;
      })
    );
  }

  // Subscribe to query params
  private subscribeToQueryParams(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe({
        next: (params) => {
          this.mapMarkerService.goToMarker(this.map, params['markerId']);
        },
      })
    );
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.mapMarkerService.resetObservables();
    this.subscription.unsubscribe();
  }

  // ***** MAP EVENT LISTENERS *****

  // Add event listeners
  private addEventListeners(): void {
    this.onMapClick();
  }

  // On map click event
  private onMapClick(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      // Reset the previous marker to detail and marker to edit
      this.markerToDetail = undefined;
      this.markerToEdit = undefined;
      this.longitude = e.latlng.lng;
      this.latitude = e.latlng.lat;
      this.addPopup = this.mapMarkerService.createAddPopup();
      this.addPopup.setLatLng(e.latlng).openOn(this.map);
    });
  }

  // On locate me event
  public onLocateMe(): void {
    this.subscription.add(
      this.geolocationService.getUserPosition().subscribe({
        next: (position) => {
          // Remove the previous location dots
          this.locationsDots.forEach((dot) => {
            this.map.removeLayer(dot);
          });
          // Create new location dots
          this.locationsDots = this.geolocationService.createLocationDot(
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

  // ***** MENU EVENT LISTENERS *****

  // On my markers check event
  public onMyMarkersChange(event: boolean): void {
    this.mapMarkerService.setMyMarkersChecked(event);
    this.mapMarkerService.displayMarkers(this.map);
  }

  // On category change event
  public onCategoryChange(event: Category[]): void {
    this.mapMarkerService.setChoosenCategories(event);
    this.mapMarkerService.displayMarkers(this.map);
  }

  // ***** MARKER FORM EVENT LISTENERS *****

  // On form closed event
  public onFormClosed(): void {
    this.isAddingMarker = false;
    this.markerToDetail = undefined;
    this.markerToEdit = undefined;
    this.addPopup.remove();
    this.mapMarkerService.displayMarkers(this.map);
  }

  // ***** MARKER DETAILS EVENT LISTENERS *****

  // On details closed event
  public onDetailsClosed(): void {
    this.markerToDetail = undefined;
    this.mapMarkerService.displayMarkers(this.map);
  }

  // On delete marker event
  public onEditMarker(): void {
    this.markerToEdit = this.markerToDetail;
    this.markerToDetail = undefined;
    this.mapMarkerService.displayMarkers(this.map);
  }
}
