import { DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { of, Subscription, switchMap } from 'rxjs';
import { Type } from '../../../../models/database/type.model';
import { Category } from '../../../../models/database/category.model';
import { Contact } from '../../../../models/database/contact.model';
import { Address } from '../../../../models/database/address.model';
import { Marker } from '../../../../models/database/marker.model';
import { AuthService } from '../../../services/auth/auth.service';
import { MarkerService } from '../../../services/database/marker/marker.service';
import { CategoryService } from '../../../services/database/category/category.service';
import { TypeService } from '../../../services/database/type/type.service';
import { ContactService } from '../../../services/database/contact/contact.service';
import { AddressService } from '../../../services/database/address/address.service';
import { ImageService } from '../../../services/database/image/image.service';
import { LikeService } from '../../../services/database/like/like.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { GeoPoint } from '@angular/fire/firestore';

@Component({
  selector: 'app-marker-details',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './marker-details.component.html',
  styleUrl: './marker-details.component.css',
})
// TODO: Check if the address is used by another marker before deleting it
export class MarkerDetailsComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Marker to detail
  @Input() marker: Marker | undefined = undefined;
  public markerType: Type | undefined = undefined;
  public markerCategory: Category | undefined = undefined;
  public markerContact: Contact | undefined = undefined;
  public markerAddress: Address | undefined = undefined;
  public markerImageURL: string | undefined = undefined;

  // Outputs events
  @Output() detailsClosed = new EventEmitter<void>();
  @Output() detailsEdited = new EventEmitter<void>();

  // Services
  private authService = inject(AuthService);
  private markerService = inject(MarkerService);
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private contactService = inject(ContactService);
  private addressService = inject(AddressService);
  private imageService = inject(ImageService);
  private likeService = inject(LikeService);
  private geolocationService = inject(GeolocationService);

  // User position
  public userPosition: GeoPoint | undefined;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the component
  public ngOnInit(): void {
    this.getCategoryAndType();
    this.getContact();
    this.getAddress();
    this.getImage();
    this.getUserPosition();
  }

  // Get the category and the type from the database
  private getCategoryAndType(): void {
    if (this.marker?.categoryID) {
      this.subscription.add(
        this.categoryService
          .getCategory(this.marker?.categoryID)
          .pipe(
            switchMap((category) => {
              this.markerCategory = category;
              return this.typeService.getType(category.typeID);
            }),
            switchMap((type) => {
              this.markerType = type;
              return of(undefined);
            })
          )
          .subscribe()
      );
    }
  }

  // Get the contact from the database
  private getContact(): void {
    if (this.marker?.contactID) {
      this.subscription.add(
        this.contactService.getContact(this.marker.contactID).subscribe({
          next: (contact) => {
            this.markerContact = contact;
          },
        })
      );
    }
  }

  // Get the address from the database
  private getAddress(): void {
    if (this.marker?.addressID) {
      this.subscription.add(
        this.addressService.getAddress(this.marker.addressID).subscribe({
          next: (address) => {
            this.markerAddress = address;
          },
        })
      );
    }
  }

  // Get the image from the database
  private getImage(): void {
    if (this.marker?.imageID) {
      this.subscription.add(
        this.imageService.getImage(this.marker.imageID).subscribe({
          next: (image) => {
            this.markerImageURL = this.imageService.createURL(image);
          },
        })
      );
    }
  }

  // Get the user's position
  private getUserPosition(): void {
    this.subscription.add(
      this.geolocationService.getUserPosition().subscribe({
        next: (position: GeoPoint) => {
          this.userPosition = position;
        },
      })
    );
  }

  // Unsuscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // *******************
  // ***** METHODS *****
  // *******************

  // Closes the details
  public onCloseDetails(): void {
    this.detailsClosed.emit();
  }

  // Edit the marker
  public onEditMarker(): void {
    if (this.marker?.userID !== this.authService.getCurrentUserId()) {
      alert("Vous ne pouvez pas modifier un lieu que vous n'avez pas créé.");
      return;
    }
    this.detailsEdited.emit();
  }

  // Delete the marker
  public onDeleteMarker(): void {
    if (this.marker?.userID !== this.authService.getCurrentUserId()) {
      alert("Vous ne pouvez pas supprimer un lieu que vous n'avez pas créé.");
      return;
    }
    this.deleteMarker();
    this.deleteContact();
    this.deleteAddress(); // TODO: Check if the address is used by another marker before deleting it
    this.deleteImage();
  }

  // Like the marker
  public onLikeMarker(): void {
    if (this.marker) {
      const currentUserID = this.authService.getCurrentUserId();
      this.subscription.add(
        this.likeService.likeMarker(currentUserID, this.marker).subscribe({
          next: () => {
            this.onCloseDetails();
          },
        })
      );
    }
  }

  // Dislike the marker
  public onDislikeMarker(): void {
    if (this.marker) {
      const currentUserID = this.authService.getCurrentUserId();
      this.subscription.add(
        this.likeService.dislikeMarker(currentUserID, this.marker).subscribe({
          next: () => {
            this.onCloseDetails();
          },
        })
      );
    }
  }

  // ***** HELPER METHODS *****

  // Delete the marker
  private deleteMarker(): void {
    if (this.marker) {
      this.markerService.deleteMarker(this.marker.markerID!).subscribe({
        next: () => {
          this.onCloseDetails();
        },
      });
    }
  }

  // Delete the contact
  private deleteContact(): void {
    if (this.markerContact) {
      this.contactService
        .deleteContact(this.markerContact.contactID!)
        .subscribe();
    }
  }

  // Delete the address
  private deleteAddress(): void {
    if (this.markerAddress) {
      this.addressService
        .deleteAddress(this.markerAddress.addressID!)
        .subscribe();
    }
  }

  // Delete the image
  private deleteImage(): void {
    if (this.marker?.imageID) {
      this.imageService.deleteImage(this.marker.imageID).subscribe();
    }
  }

  // Compute the distance between a marker and the user
  public computeDistance(marker: Marker | undefined): string {
    if (this.userPosition && marker) {
      return this.geolocationService
        .computeDistance(marker, this.userPosition)
        .toFixed(2);
    } else {
      return 'N/A';
    }
  }
}
