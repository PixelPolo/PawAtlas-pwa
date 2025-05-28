import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../models/database/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/users';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a user
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }

  // Get all the users
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  // Get a user by ID
  public getUserById(userID: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${userID}`);
  }

  // Get a user by display name
  public getUserByDisplayName(displayName: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/displayName/${displayName}`);
  }

  // Update a user
  public updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiURL}/${user.userID}`, user);
  }

  // Delete a user
  public deleteUser(userID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${userID}`);
  }
}
