import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Veterinarian } from '../../../../models/database/veterinarian.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeterinarianService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/veterinarians';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new veterinarian
  public createVeterinarian(
    veterinarian: Veterinarian
  ): Observable<Veterinarian> {
    return this.http.post<Veterinarian>(this.apiURL, veterinarian);
  }

  // Get all the veterinarians
  public getVeterinarians(): Observable<Veterinarian[]> {
    return this.http.get<Veterinarian[]>(this.apiURL);
  }

  // Get a veterinarian by ID
  public getVeterinarian(veterinarianID: string): Observable<Veterinarian> {
    return this.http.get<Veterinarian>(`${this.apiURL}/${veterinarianID}`);
  }

  // Update a veterinarian
  public updateVeterinarian(
    veterinarianID: string,
    veterinarian: Veterinarian
  ): Observable<Veterinarian> {
    return this.http.patch<Veterinarian>(
      `${this.apiURL}/${veterinarianID}`,
      veterinarian
    );
  }

  // Delete a veterinarian
  public deleteVeterinarian(veterinarianID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${veterinarianID}`);
  }
}
