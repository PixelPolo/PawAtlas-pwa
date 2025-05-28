import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ContactService } from '../../../services/database/contact/contact.service';
import { Contact } from '../../../../models/database/contact.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit, OnChanges {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Optional contactID input to update a contact
  @Input() contactToEdit: Contact | undefined = undefined;

  // Services
  private contactService = inject(ContactService);

  // New contact form (only for service category)
  public newContactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl(''),
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
    this.initContactForm();
  }

  // Initialize the component on input changes
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactToEdit']) {
      this.initContactForm();
    }
  }

  // Initialize the contact form
  private initContactForm(): void {
    if (this.contactToEdit) {
      this.newContactForm.setValue({
        firstName: this.contactToEdit.firstName || null,
        lastName: this.contactToEdit.lastName || null,
        phoneNumber: this.contactToEdit.phoneNumber || null,
        email: this.contactToEdit.email || null,
        website: this.contactToEdit.website || null,
      });
    }
  }

  // ***** FORM SUBMISSION *****

  // Method to submit the form, should be called by a parent component
  public submitForm(): Observable<Contact | undefined> {
    const contact: Contact | null = this.createContact();
    if (contact) {
      return this.postContact(contact);
    } else {
      return of(undefined);
    }
  }

  // ***** HELPER METHODS *****

  // Create a contact object from the form
  private createContact(): Contact | null {
    if (this.newContactForm.pristine) return null;
    const contact: Contact = {
      firstName: this.newContactForm.value.firstName || undefined,
      lastName: this.newContactForm.value.lastName || undefined,
      phoneNumber: this.newContactForm.value.phoneNumber || undefined,
      email: this.newContactForm.value.email || undefined,
      website: this.newContactForm.value.website || undefined,
    };
    return contact;
  }

  // Post a contact object to the database
  private postContact(contact: Contact): Observable<Contact> {
    if (this.contactToEdit) {
      return this.contactService.updateContact(
        this.contactToEdit.contactID!,
        contact
      );
    } else {
      return this.contactService.createContact(contact);
    }
  }
}
