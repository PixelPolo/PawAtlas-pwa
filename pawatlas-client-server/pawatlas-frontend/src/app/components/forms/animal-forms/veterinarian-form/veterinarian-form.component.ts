import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Veterinarian } from '../../../../../models/database/veterinarian.model';
import { VeterinarianService } from '../../../../services/database/veterinarian/veterinarian.service';
import { Contact } from '../../../../../models/database/contact.model';
import { Address } from '../../../../../models/database/address.model';
import { ContactFormComponent } from '../../contact-form/contact-form.component';
import { AddressFormComponent } from '../../address-form/address-form.component';
import { Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { AddressService } from '../../../../services/database/address/address.service';
import { ContactService } from '../../../../services/database/contact/contact.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-veterinarian-form',
  standalone: true,
  imports: [ReactiveFormsModule, ContactFormComponent, AddressFormComponent],
  templateUrl: './veterinarian-form.component.html',
  styleUrl: './veterinarian-form.component.css',
})
export class VeterinarianFormComponent implements OnInit, OnChanges, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Optional veterinarian input to update
  @Input() veterinarianToEdit: Veterinarian | undefined = undefined;

  // Contact and address form components
  @ViewChild('contactForm') contactForm!: ContactFormComponent;
  @ViewChild('addressForm') addressForm!: AddressFormComponent;

  // Services
  private veterinarianService = inject(VeterinarianService);
  private addressService = inject(AddressService);
  private contactService = inject(ContactService);

  // Contact and address to edit
  public contactToEdit: Contact | undefined = undefined;
  public addressToEdit: Address | undefined = undefined;

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
    this.initForms();
  }

  // Initialize the component on input changes
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['veterinarianToEdit']) {
      this.initForms();
    }
  }

  // Initialize the forms
  private initForms(): void {
    this.initAddressToEdit();
    this.initContactToEdit();
  }

  // Initialize the address to edit according to the veterinarian to edit
  private initAddressToEdit(): void {
    if (!this.veterinarianToEdit || !this.veterinarianToEdit.addressID) return;
    this.subscription.add(
      this.addressService
        .getAddress(this.veterinarianToEdit.addressID!)
        .subscribe({
          next: (address) => {
            this.addressToEdit = address;
          },
        })
    );
  }

  // Initialize the contact to edit according to the veterinarian to edit
  private initContactToEdit(): void {
    if (!this.veterinarianToEdit || !this.veterinarianToEdit.contactID) return;
    this.subscription.add(
      this.contactService
        .getContact(this.veterinarianToEdit.contactID!)
        .subscribe({
          next: (contact) => {
            this.contactToEdit = contact;
          },
        })
    );
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** METHODS *****

  // Submit the form
  public submitForm(): Observable<Veterinarian | undefined> {
    return this.submitAddressForm().pipe(
      switchMap((address) => {
        this.addressToEdit = address;
        return this.submitContactForm();
      }),
      switchMap((contact) => {
        this.contactToEdit = contact;
        return this.submitVeterinarianForm();
      }),
      tap((veterinarian) => {
        this.veterinarianToEdit = veterinarian;
      })
    );
  }

  // Submit the address form
  private submitAddressForm(): Observable<Address | undefined> {
    if (!this.addressForm) return of(undefined);
    else return this.addressForm.submitForm();
  }

  // Submit the contact form
  private submitContactForm(): Observable<Contact | undefined> {
    if (!this.contactForm) return of(undefined);
    return this.contactForm.submitForm();
  }

  // Submit the veterinarian form
  private submitVeterinarianForm(): Observable<Veterinarian | undefined> {
    const newVeterinarian: Veterinarian | null = this.createVeterinarian();
    if (newVeterinarian) {
      return this.postVeterinarian(newVeterinarian);
    } else {
      return of(undefined);
    }
  }

  // Create a new veterinarian
  private createVeterinarian(): Veterinarian | null {
    if (!this.contactToEdit && !this.addressToEdit) return null;
    const veterinarian: Veterinarian = {
      contactID: this.contactToEdit?.contactID,
      addressID: this.addressToEdit?.addressID,
    };
    return veterinarian;
  }

  // Post a veterinarian object to the database
  private postVeterinarian(
    veterinarian: Veterinarian
  ): Observable<Veterinarian> {
    if (this.veterinarianToEdit) {
      return this.veterinarianService.updateVeterinarian(
        this.veterinarianToEdit.veterinarianID!,
        veterinarian
      );
    } else {
      return this.veterinarianService.createVeterinarian(veterinarian);
    }
  }
}
