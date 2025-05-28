import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserAnimalOwnership } from '../../../../models/database/user-animal-ownership.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAnimalOwnershipService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/user-animal-ownerships';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new user-animal ownership
  public createUserAnimalOwnership(
    userAnimalOwnership: UserAnimalOwnership
  ): Observable<UserAnimalOwnership> {
    return this.http.post<UserAnimalOwnership>(
      this.apiURL,
      userAnimalOwnership
    );
  }

  // Get all the user-animal ownerships
  public getUserAnimalOwnerships(): Observable<UserAnimalOwnership[]> {
    return this.http.get<UserAnimalOwnership[]>(this.apiURL);
  }

  // Get a user-animal ownership by ID
  public getUserAnimalOwnership(
    userID: string,
    animalID: string
  ): Observable<UserAnimalOwnership> {
    return this.http.get<UserAnimalOwnership>(
      `${this.apiURL}/${userID}/${animalID}`
    );
  }

  // Update a user-animal ownership
  public updateUserAnimalOwnership(
    userID: string,
    animalID: string,
    userAnimalOwnership: UserAnimalOwnership
  ): Observable<UserAnimalOwnership> {
    return this.http.patch<UserAnimalOwnership>(
      `${this.apiURL}/${userID}/${animalID}`,
      userAnimalOwnership
    );
  }

  // Delete a user-animal ownership
  public deleteUserAnimalOwnership(
    userID: string,
    animalID: string
  ): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${userID}/${animalID}`);
  }

  // ***** OTHER OPERATIONS *****

  // Get all the animals of a user
  public getUserOwnerships(userID: string): Observable<UserAnimalOwnership[]> {
    return this.http.get<UserAnimalOwnership[]>(
      `${this.apiURL}/user/${userID}/animals`
    );
  }

  // Get all the users of an animal
  public getAnimalOwnerships(
    animalID: string
  ): Observable<UserAnimalOwnership[]> {
    return this.http.get<UserAnimalOwnership[]>(
      `${this.apiURL}/animal/${animalID}/users`
    );
  }
}
