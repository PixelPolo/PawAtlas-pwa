import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../../../../models/database/type.model';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/types';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Get all the types
  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiURL);
  }

  // Get a type by its ID
  public getType(typeID: string): Observable<Type> {
    return this.http.get<Type>(`${this.apiURL}/${typeID}`);
  }
}
