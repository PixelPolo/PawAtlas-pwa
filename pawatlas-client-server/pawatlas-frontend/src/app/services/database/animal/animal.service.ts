import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../../models/database/animal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/animals';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new animal
  public createAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiURL, animal);
  }

  // Get all the animals
  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiURL);
  }

  // Get all the animals by user ID
  public getAnimalsByUserID(userID: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiURL}/users/${userID}`);
  }

  // Get an animal by ID
  public getAnimal(animalID: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiURL}/${animalID}`);
  }

  // Update an animal
  public updateAnimal(animalID: string, animal: Animal): Observable<Animal> {
    return this.http.patch<Animal>(`${this.apiURL}/${animalID}`, animal);
  }

  // Delete an animal
  public deleteAnimal(animalID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${animalID}`);
  }
}
