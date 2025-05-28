import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Weight } from '../../../../models/database/weight.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/weights';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new weight
  public createWeight(weight: Weight): Observable<Weight> {
    return this.http.post<Weight>(this.apiURL, weight);
  }

  // Get all the weights
  public getWeights(): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.apiURL);
  }

  // Get a weight by ID
  public getWeight(weightID: string): Observable<Weight> {
    return this.http.get<Weight>(`${this.apiURL}/${weightID}`);
  }

  // Update a weight
  public updateWeight(weightID: string, weight: Weight): Observable<Weight> {
    return this.http.patch<Weight>(`${this.apiURL}/${weightID}`, weight);
  }

  // Delete a weight
  public deleteWeight(weightID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${weightID}`);
  }
}
