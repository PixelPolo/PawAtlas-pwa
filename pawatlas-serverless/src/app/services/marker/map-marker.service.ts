import { inject, Injectable } from '@angular/core';
import L from 'leaflet';
import { DesignService } from '../design/design.service';
import { Marker } from '../../models/interfaces/marker';

// Set the default image path for the markers
L.Icon.Default.imagePath = 'assets/leaflet/';

@Injectable({
  providedIn: 'root',
})
export class MapMarkerService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private designService = inject(DesignService);

  // Array of all displayed markers
  private allDisplayedMarkers: L.Marker[] = [];

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** FORMAT MARKERS FROM FIREBASE *****

  // Format a marker from the firestore database
  private formatMarker(marker: Marker): L.Marker {
    // Create a new Leaflet marker with the location
    const newMarker = new L.Marker([
      marker.location.latitude,
      marker.location.longitude,
    ]);
    // Set the icon of the marker
    this.setIcon(newMarker, marker.category);
    // Set the content of the popup
    this.setContent(newMarker, marker);
    // Return the new marker
    return newMarker;
  }

  // Set the icon of the marker
  private setIcon(marker: L.Marker, category: string): void {
    marker.setIcon(this.designService.getLeafletIconURL(category));
  }

  // Set the content of the popup
  private setContent(newMarker: L.Marker, marker: Marker): void {
    // Prepare the content of the popup
    let content = document.createElement('div');
    let detailButton = this.createDetailButton();
    content.innerHTML = `
      <p class="m-0"><b>${marker.name}</b></p>
      <div class="mt-2" style="text-align: right">
      <p class="m-0">Rejeté : <b>${marker.disapprovedVotes}</b></p>
      <p class="m-0">Approuvé : <b>${marker.approvedVotes}</b></p>
      </div>
      <div class="text-center mt-2">
        ${detailButton.outerHTML}
      </div>
    `;
    // Bind the content to the marker's popup
    newMarker.bindPopup(content);
  }

  // Create a button for showing the details of the marker
  private createDetailButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-success', 'btn-sm', 'detailButton');
    button.textContent = 'Détails';
    return button;
  }

  // ***** ADD MARKERS TO THE MAP *****

  // Add a marker to the map, push it to allDisplayedMarkers and return it
  public createMarker(marker: Marker, map: L.Map): L.Marker {
    const newMarker = this.formatMarker(marker);
    if (!this.allDisplayedMarkers.includes(newMarker)) {
      this.allDisplayedMarkers.push(newMarker);
    }
    return newMarker;
  }

  // Remove all markers from the map and reset allDisplayedMarkers
  public removeAllMarkers(map: L.Map): void {
    this.allDisplayedMarkers.forEach((marker) => {
      map.removeLayer(marker);
    });
    this.allDisplayedMarkers = [];
  }
}
