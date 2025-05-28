import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Address } from '../../../../models/database/address.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AddressService } from '../../../services/database/address/address.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
// TODO : CHECK IF THE ADDRESS ALREADY EXISTS IN THE DATABASE BEFORE POSTING
export class AddressFormComponent implements OnInit, OnChanges {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Optional address input to update
  @Input() addressToEdit: Address | undefined = undefined;

  // Services
  private addressService = inject(AddressService);

  // New address form
  public newAddressForm = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
  });

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the component
  public ngOnInit(): void {
    this.initAddressForm();
  }

  // Initialize the component on input changes
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressToEdit']) {
      this.initAddressForm();
    }
  }

  // Initialize the address form
  private initAddressForm(): void {
    if (this.addressToEdit) {
      this.newAddressForm.setValue({
        street: this.addressToEdit.street || null,
        city: this.addressToEdit.city || null,
        postalCode: this.addressToEdit.postalCode || null,
        state: this.addressToEdit.state || null,
        country: this.addressToEdit.country || null,
      });
    }
  }

  // ***** FORM SUBMISSION *****

  // Method to submit the form, should be called by a parent component
  public submitForm(): Observable<Address | undefined> {
    const address: Address | null = this.createAddress();
    if (address) {
      return this.postAddress(address);
    } else {
      return of(undefined);
    }
  }

  // ***** HELPER METHODS *****

  // Create an address object from the form
  private createAddress(): Address | null {
    if (this.newAddressForm.pristine) return null;
    const address: Address = {
      street: this.newAddressForm.value.street || undefined,
      city: this.newAddressForm.value.city || undefined,
      postalCode: this.newAddressForm.value.postalCode || undefined,
      state: this.newAddressForm.value.state || undefined,
      country: this.newAddressForm.value.country || undefined,
    };
    return address;
  }

  // Post an address object to the database
  private postAddress(address: Address): Observable<Address> {
    if (this.addressToEdit) {
      return this.addressService.updateAddress(
        this.addressToEdit.addressID!,
        address
      );
    } else {
      return this.addressService.createAddress(address);
    }
  }
}
