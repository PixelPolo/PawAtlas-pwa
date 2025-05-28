import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Marker } from '../../../../models/database/marker.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/markers';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a marker
  public createMarker(marker: Marker): Observable<Marker> {
    return this.http.post<Marker>(this.apiURL, marker);
  }

  // Get all the markers
  public getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.apiURL);
  }

  // Get a marker by ID
  public getMarker(markerID: string): Observable<Marker> {
    return this.http.get<Marker>(`${this.apiURL}/${markerID}`);
  }

  // Update a marker
  public updateMarker(markerID: string, marker: Marker): Observable<Marker> {
    return this.http.patch<Marker>(`${this.apiURL}/${markerID}`, marker);
  }

  // Delete a marker
  public deleteMarker(markerID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${markerID}`);
  }

  // ***** OTHER OPERATIONS *****

  // Get all the danger markers
  public getDangerMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${this.apiURL}/danger`);
  }

  // Get all the interest markers
  public getInterestMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${this.apiURL}/interest`);
  }

  // Get all the service markers
  public getServiceMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${this.apiURL}/service`);
  }
}
