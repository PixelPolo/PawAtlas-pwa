import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../../../models/database/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/contacts';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a contact
  public createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiURL, contact);
  }

  // Get all the contacts
  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL);
  }

  // Get a contact by ID
  public getContact(contactID: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiURL}/${contactID}`);
  }

  // Update a contact
  public updateContact(
    contactID: string,
    contact: Contact
  ): Observable<Contact> {
    return this.http.patch<Contact>(`${this.apiURL}/${contactID}`, contact);
  }

  // Delete a contact
  public deleteContact(contactID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${contactID}`);
  }
}
