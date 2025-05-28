import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../../../models/database/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/addresses';
  private http = inject(HttpClient);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new address
  public createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiURL, address);
  }

  // Get all the addresses
  public getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiURL);
  }

  // Get an address by ID
  public getAddress(addressID: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiURL}/${addressID}`);
  }

  // Update an address
  public updateAddress(
    addressID: string,
    address: Address
  ): Observable<Address> {
    return this.http.patch<Address>(`${this.apiURL}/${addressID}`, address);
  }

  // Delete an address
  public deleteAddress(addressID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${addressID}`);
  }
}
