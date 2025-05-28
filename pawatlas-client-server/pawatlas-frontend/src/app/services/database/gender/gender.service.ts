import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../../../../models/database/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/genders';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Get a gender by ID
  public getGender(id: string): Observable<Gender> {
    return this.http.get<Gender>(this.apiURL + '/' + id);
  }

  // Get all the genders
  public getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.apiURL);
  }
}
