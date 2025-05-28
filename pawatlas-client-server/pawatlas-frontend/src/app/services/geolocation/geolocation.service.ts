import L from 'leaflet';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GeoPoint } from '@angular/fire/firestore';
import { Marker } from '../../../models/database/marker.model';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Get the user's position
  public getUserPosition(): Observable<GeoPoint> {
    return new Observable((observer) => {
      // Success callback
      const successCallback = (position: GeolocationPosition) => {
        const userPosition = new GeoPoint(
          position.coords.latitude,
          position.coords.longitude
        );
        observer.next(userPosition);
        observer.complete();
      };

      // Error callback
      const errorCallback = (error: GeolocationPositionError) => {
        console.error('Error getting location', error);
        observer.error(error);
      };

      // Options for the geolocation
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      // Get the current position
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    });
  }

  // Create a location dot on the map
  public createLocationDot(
    map: L.Map,
    lat: number,
    lon: number
  ): L.CircleMarker[] {
    const locationDots: L.CircleMarker[] = [];
    // Set the view to the user's position
    map.setView([lat, lon], 16);
    // Add a bigger light gray circle to the user's position
    locationDots.push(
      L.circleMarker([lat, lon], {
        color: 'transparent',
        fillColor: '#cdddf6',
        fillOpacity: 0.75,
        radius: 20, // radius in pixels
      })
    );
    // Add a blue circle to the user's position
    const circle = L.circleMarker([lat, lon], {
      color: 'white',
      fillColor: '#3a7afc',
      fillOpacity: 1,
      radius: 10, // radius in pixels
    });
    // Add a popup to the blue circle
    circle.bindPopup('Vous êtes ici');
    // Add the blue circle to the map
    locationDots.push(circle);
    // Return the circles
    return locationDots;
  }

  // Compute the distance between a point and a marker
  public computeDistance(marker: Marker, position: GeoPoint): number {
    if (position) {
      const userLatitude = position.latitude;
      const userLongitude = position.longitude;
      const markerLatitude = marker.markerLat;
      const markerLongitude = marker.markerLng;
      // Return the distance in kilometers with 2 decimals
      return (
        Math.sqrt(
          Math.pow(markerLatitude - userLatitude, 2) +
            Math.pow(markerLongitude - userLongitude, 2)
        ) * 100
      );
    } else {
      return -1;
    }
  }
}
