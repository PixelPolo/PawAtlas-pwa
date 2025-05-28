import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Marker } from '../../models/interfaces/marker';
import { FirestorePawatlasService } from '../../services/firestore/pawatlas/firestore-pawatlas.service';
import { DesignService } from '../../services/design/design.service';
import { dangerCategories, interestCategories } from '../../models/categories';
import { GeoPoint } from '@angular/fire/firestore';

@Component({
  selector: 'app-marker-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './marker-form.component.html',
  styleUrl: './marker-form.component.css',
})

// TODO - IMAGE UPLOAD OFFLINE, MAYBE INDEXEDDB
export class MarkerFormComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Inputs for lat and long of the clicked point
  @Input() latitude: string = '';
  @Input() longitude: string = '';

  // Inputs if we want to edit a marker
  @Input() markerToEdit: Marker | null = null;

  // Outputs events to the parent that the form is closed
  @Output() formClosed = new EventEmitter<void>();

  // Services
  private firestorePawatlasService = inject(FirestorePawatlasService);
  public designService = inject(DesignService);
  private formBuilder = inject(FormBuilder);

  // Selected categories
  public filteredCategories = dangerCategories;

  // New Marker Form
  public newMarkerForm = this.formBuilder.group({
    type: ['', Validators.required],
    category: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  // Image Data and URL
  private selectedFile: File | null = null;
  private downloadURL: string | null = null;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the form
  public ngOnInit(): void {
    // Subscribe to the category changes
    this.subscription.add(
      this.newMarkerForm.get('category')?.valueChanges.subscribe((value) => {
        // Method when the category changes
        this.onCategoryChange(value!);
      })
    );
    // Initialize the form
    this.initForm();
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Initialize the form
  private initForm(): void {
    if (this.markerToEdit) {
      // Set the form values with the marker to edit
      this.latitude = this.markerToEdit.location.latitude.toString();
      this.longitude = this.markerToEdit.location.longitude.toString();
      this.newMarkerForm.get('type')?.setValue(this.markerToEdit.type);
      this.newMarkerForm.get('category')?.setValue(this.markerToEdit.category);
      this.switchFilterCategories(this.markerToEdit.type); // For the category field
      // Name is automatically set when the category changes (see onInit subscription)
      this.newMarkerForm
        .get('description')
        ?.setValue(this.markerToEdit.description);
      // Set the image
      this.downloadURL = this.markerToEdit.image;
    } else {
      this.newMarkerForm.get('type')?.setValue('danger');
      this.newMarkerForm.get('category')?.setValue(dangerCategories[0].value);
      this.newMarkerForm.get('name')?.setValue(dangerCategories[0].label);
      this.newMarkerForm.get('name')?.disable();
    }
  }

  // ***** FORM METHODS *****

  // On type change
  public onTypeChange(event: any) {
    const selectedType = event.target.value;
    this.switchFilterCategories(selectedType);
    this.newMarkerForm
      .get('category')
      ?.setValue(this.filteredCategories[0].value);
  }

  // Switch the filter categories
  private switchFilterCategories(type: string): void {
    if (type === 'danger') {
      this.filteredCategories = dangerCategories;
    } else if (type === 'interest') {
      this.filteredCategories = interestCategories;
    }
  }

  // On category change
  private onCategoryChange(category: string): void {
    // Enable or disable the 'name' field if the category is 'Autre'
    const nameControl = this.newMarkerForm.get('name');
    if (category === 'Autre intérêt' || category === 'Autre danger') {
      nameControl?.enable();
      nameControl?.setValue('');
    } else {
      nameControl?.disable();
      nameControl?.setValue(category);
    }
  }

  // Cancel the form
  public cancelNewMarkerForm(): void {
    this.resetImage();
    this.formClosed.emit();
  }

  // Reset the image
  private resetImage(): void {
    this.selectedFile = null;
    this.downloadURL = '';
  }

  // Submit the form
  public submitNewMarkerForm(): void {
    // Alert the user that the marker is being saved
    alert('Le lieu est en cours de sauvegarde...');    
    // Upload the file
    this.subscription.add(
      this.uploadFile()
        .pipe(
          switchMap((url) => {
            // Save the url and save the marker
            this.downloadURL = url;
            return this.saveMarker();
          })
        )
        .subscribe({
          next: () => {
            this.cancelNewMarkerForm();
          },
          error: (error) => {
            console.error(error);
          },
        })
    );
    // If we are offline, emit the form closed event
    if (!navigator.onLine) {
      this.cancelNewMarkerForm();
    }
  }

  // ***** IMAGES METHODS *****

  // On file selected click
  public onFileSelectedClick(): void {
    // Alert the user that if he's offline, he can't upload an image
    if (!navigator.onLine) {
      alert(
        "Vous ne pouvez pas ajouter d'image si vous êtes hors ligne. " +
          'Cependant, vous pouvez toujours ajouter un lieu et ajouter une image plus tard !'
      );
      // Disable the file input
      const fileInput = document.getElementById('fileInput');
      fileInput!.setAttribute('disabled', 'true');
      return;
    }
  }

  // On file selected
  public onFileSelected(event: any) {
    // Get the file and set it
    const file: File = event.target.files[0];
    this.selectedFile = file ? file : null;
    // Set the form non pristine
    this.newMarkerForm.markAsDirty();
  }

  // Upload the file
  private uploadFile(): Observable<any> {
    if (!this.selectedFile && !this.markerToEdit) {
      // If no file is selected and we are not editing a marker
      return new Observable((observer) => {
        // Return a default string as url
        observer.next('No image');
        observer.complete();
      });
    } else if (!this.selectedFile && this.markerToEdit) {
      // If no file is selected but we are editing a marker
      return new Observable((observer) => {
        // Keep the image of the marker
        observer.next(this.markerToEdit!.image);
        observer.complete();
      });
    } else {
      // Upload the file, pass the marker to update its image if we are editing
      return this.firestorePawatlasService.uploadImage(
        this.selectedFile!,
        this.markerToEdit
      );
    }
  }

  // Delete the image
  public deleteImage(): void {
    // Check if the user is offline
    if (!navigator.onLine) {
      alert(
        "Vous ne pouvez pas supprimer l'image si vous êtes hors ligne. " +
          "Cependant, vous pouvez toujours supprimer l'image plus tard !"
      );
      return;
    }
    // Check if the user owns the marker
    if (this.markerToEdit && this.markerToEdit.image !== 'No image') {
      this.firestorePawatlasService.deleteImage(
        this.markerToEdit,
        this.markerToEdit.image
      );
    }
  }

  // ***** SAVE MARKER *****

  // Create a marker
  private saveMarker(): Observable<any> {
    const newMarker = this.constructMarker();
    if (this.markerToEdit) {
      // Update the marker if we are editing
      return this.firestorePawatlasService.updateMarker(
        this.markerToEdit.id!,
        this.markerToEdit.userID!,
        newMarker
      );
    } else {
      // Post the marker if we are creating
      return this.firestorePawatlasService.postMarker(newMarker);
    }
  }

  // Construct the marker from the form
  private constructMarker(): Marker {
    // Get the values for the new marker
    const location = new GeoPoint(
      Number(this.latitude),
      Number(this.longitude)
    );
    const type = this.newMarkerForm.get('type')?.value;
    const category = this.newMarkerForm.get('category')?.value;
    const name = this.newMarkerForm.get('name')?.value;
    const description = this.newMarkerForm.get('description')?.value;
    const image = this.downloadURL;
    let approvedVotes = 0;
    let disapprovedVotes = 0;
    // If we are editing a marker, keep the votes
    if (this.markerToEdit) {
      approvedVotes = this.markerToEdit.approvedVotes;
      disapprovedVotes = this.markerToEdit.disapprovedVotes;
    }
    // Create the new marker
    if (location && type && category && name && description && image) {
      const newMarker: Marker = {
        location,
        type,
        category,
        name,
        description,
        image,
        approvedVotes,
        disapprovedVotes,
      };
      return newMarker;
    } else {
      throw new Error('Missing data');
    }
  }
}
