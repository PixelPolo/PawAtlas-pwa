import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../../models/database/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/categories';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Get a category by ID
  public getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(this.apiURL + '/' + id);
  }

  // Get all the categories
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }
}
