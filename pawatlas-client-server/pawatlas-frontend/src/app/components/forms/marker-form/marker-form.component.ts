import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Type } from '../../../../models/database/type.model';
import { Marker } from '../../../../models/database/marker.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Contact } from '../../../../models/database/contact.model';
import { Address } from '../../../../models/database/address.model';
import { Category } from '../../../../models/database/category.model';
import { TypeService } from '../../../services/database/type/type.service';
import { MarkerService } from '../../../services/database/marker/marker.service';
import { ContactService } from '../../../services/database/contact/contact.service';
import { AddressService } from '../../../services/database/address/address.service';
import { CategoryService } from '../../../services/database/category/category.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Image } from '../../../../models/database/image.model';
import { ImageService } from '../../../services/database/image/image.service';
import { ImageFormComponent } from '../image-form/image-form.component';

@Component({
  selector: 'app-marker-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactFormComponent,
    AddressFormComponent,
    ImageFormComponent,
  ],
  templateUrl: './marker-form.component.html',
  styleUrl: './marker-form.component.css',
})
export class MarkerFormComponent implements OnInit, OnChanges, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Outputs events to the parent that the form is closed
  @Output() formClosed = new EventEmitter<void>();

  // Contact, address and image form components
  @ViewChild('contactForm') contactForm!: ContactFormComponent;
  @ViewChild('addressForm') addressForm!: AddressFormComponent;
  @ViewChild('imageForm') imageForm!: ImageFormComponent;

  // Inputs for lat and long of the clicked point
  @Input() latitude = '';
  @Input() longitude = '';

  // Inputs if we want to edit a marker
  @Input() markerToEdit: Marker | undefined = undefined;

  // Contact, address and image to edit
  public addressToEdit: Address | undefined = undefined;
  public contactToEdit: Contact | undefined = undefined;
  public imageToEdit: Image | undefined = undefined;

  // Sevices
  private typeService = inject(TypeService);
  private categoryService = inject(CategoryService);
  private contactService = inject(ContactService);
  private addressService = inject(AddressService);
  private imageService = inject(ImageService);
  private markerService = inject(MarkerService);
  private authService = inject(AuthService);

  // New marker form
  public newMarkerForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    categoryID: new FormControl('', [Validators.required]),
    markerName: new FormControl('', [Validators.required]),
    markerDescription: new FormControl('', [Validators.required]),
  });

  // Types and categories
  private serviceType = 't03';
  public types: Type[] = [];
  public categories: Category[] = [];
  public selectedType: Type | undefined = undefined;
  public filteredCategories: Category[] = [];
  public isAddingService = false;

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
    this.initData();
    this.subscription.add(
      this.newMarkerForm.statusChanges.subscribe({
        next: () => {
          this.setIsRequired();
        },
      })
    );
  }

  // Add the required css class to the required fields
  private setIsRequired(): void {
    for (const key in this.newMarkerForm.controls) {
      const control = this.newMarkerForm.get(key);
      document.getElementById(key)?.classList.remove('is-required');
      if (control?.value !== undefined && control?.getError('required')) {
        document.getElementById(key)?.classList.add('is-required');
      }
    }
  }

  // Initialize the component on input changes
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['markerToEdit']) {
      this.initForms();
    }
  }

  // Initialize the types, the categories and the forms
  private initData(): void {
    this.subscription.add(
      this.typeService
        .getTypes()
        .pipe(
          switchMap((types) => {
            this.types = types;
            return this.categoryService.getCategories();
          }),
          switchMap((categories) => {
            this.categories = categories;
            this.initForms();
            return of(undefined);
          })
        )
        .subscribe()
    );
  }

  // Initialize the forms
  private initForms(): void {
    this.initAddressToEdit();
    this.initContactToEdit();
    this.initImageToEdit();
    this.initMarkerForm();
    this.setIsRequired();
  }

  // Initialize the address to edit according the marker to edit
  private initAddressToEdit(): void {
    if (!this.markerToEdit?.addressID) return;
    this.subscription.add(
      this.addressService.getAddress(this.markerToEdit.addressID!).subscribe({
        next: (address) => {
          this.addressToEdit = address;
        },
      })
    );
  }

  // Initialize the contact to edit according the marker to edit
  private initContactToEdit(): void {
    if (!this.markerToEdit?.contactID) return;
    this.subscription.add(
      this.contactService.getContact(this.markerToEdit.contactID!).subscribe({
        next: (contact) => {
          this.contactToEdit = contact;
        },
      })
    );
  }

  // Initialize the image to edit according the marker to edit
  private initImageToEdit(): void {
    if (!this.markerToEdit?.imageID) return;
    this.subscription.add(
      this.imageService.getImage(this.markerToEdit.imageID).subscribe({
        next: (image) => {
          this.imageToEdit = image;
        },
      })
    );
  }

  // Initialize the marker form
  private initMarkerForm(): void {
    if (!this.markerToEdit) return;
    this.subscription.add(
      this.categoryService.getCategory(this.markerToEdit.categoryID).subscribe({
        next: (category) => {
          this.newMarkerForm.setValue({
            type: category.typeID,
            categoryID: category.categoryID,
            markerName: this.markerToEdit!.markerName,
            markerDescription: this.markerToEdit!.markerDescription,
          });
        },
      })
    );
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** METHODS *****

  // On type change event
  public onTypeChange(): void {
    // Filter the categories based on the selected type
    const typeID = this.newMarkerForm.value.type;
    this.filteredCategories = this.categories.filter(
      (category) => category.typeID === typeID
    );
    if (typeID === this.serviceType) {
      this.isAddingService = true;
    } else {
      this.isAddingService = false;
    }
  }

  // Submit the form
  public onSubmit(): void {
    this.subscription.add(
      this.submitAddressForm()
        .pipe(
          switchMap((address) => {
            this.addressToEdit = address;
            return this.submitContactForm();
          }),
          switchMap((contact) => {
            this.contactToEdit = contact;
            return this.submitImageForm();
          }),
          switchMap((image) => {
            this.imageToEdit = image;
            return this.submitMarkerForm();
          })
        )
        .subscribe({
          next: (marker) => {
            this.markerToEdit = marker;
            this.onCloseForm();
          },
        })
    );
  }

  // Close the form
  public onCloseForm(): void {
    this.formClosed.emit();
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

  // Submit the image form
  private submitImageForm(): Observable<Image | undefined> {
    if (!this.imageForm) return of(undefined);
    return this.imageForm.submitForm();
  }

  // Submit the marker form
  private submitMarkerForm(): Observable<Marker | undefined> {
    const newMarker: Marker | null = this.createMarker();
    if (newMarker) {
      return this.postMarker(newMarker);
    } else {
      return of(undefined);
    }
  }

  // Create a new marker object
  private createMarker(): Marker | null {
    if (this.newMarkerForm.pristine) return null;
    const newMarker: Marker = {
      markerLat: Number(this.markerToEdit?.markerLat || this.latitude),
      markerLng: Number(this.markerToEdit?.markerLng || this.longitude),
      markerName: this.newMarkerForm.value.markerName!,
      markerDescription: this.newMarkerForm.value.markerDescription!,
      categoryID: this.newMarkerForm.value.categoryID!,
      userID: this.authService.getCurrentUserId(),
      contactID: this.contactToEdit?.contactID,
      addressID: this.addressToEdit?.addressID,
      imageID: this.imageToEdit?.imageID,
    };
    return newMarker;
  }

  // Post a marker object to the database
  private postMarker(marker: Marker): Observable<Marker> {
    if (this.markerToEdit) {
      return this.markerService.updateMarker(
        this.markerToEdit.markerID!,
        marker
      );
    } else {
      return this.markerService.createMarker(marker);
    }
  }
}
