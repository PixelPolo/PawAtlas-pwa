import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/*
shareReplay(1) caches the last emitted value
The cache is useful when multiple components subscribe to the same observable
It avoids multiple API calls, using the RAM of the browser to store the last emitted value
*/

// https://www.learnrxjs.io/learn-rxjs/operators/multicasting/sharereplay
export class NominatimService {
  // ******************
  // ***** FIELDS *****
  // ******************
  private http: HttpClient = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Get the location details from the nominatim API
  public getLocationDetails(lat: Number, lon: Number): Observable<any> {
    return this.http
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
      .pipe(shareReplay(1));
  }

  // Search for locations based on a query string
  public searchLocations(query: string): Observable<any> {
    return this.http
      .get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      )
      .pipe(shareReplay(1));
  }
}
