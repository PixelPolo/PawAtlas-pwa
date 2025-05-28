import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Animal } from '../../../../../models/database/animal.model';
import { AnimalService } from '../../../../services/database/animal/animal.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageFormComponent } from '../../image-form/image-form.component';
import { VeterinarianFormComponent } from '../veterinarian-form/veterinarian-form.component';
import { Gender } from '../../../../../models/database/gender.model';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { Veterinarian } from '../../../../../models/database/veterinarian.model';
import { Image } from '../../../../../models/database/image.model';
import { GenderService } from '../../../../services/database/gender/gender.service';
import { ImageService } from '../../../../services/database/image/image.service';
import { VeterinarianService } from '../../../../services/database/veterinarian/veterinarian.service';
import { UserAnimalOwnershipService } from '../../../../services/database/ownership/user-animal-ownership.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserAnimalOwnership } from '../../../../../models/database/user-animal-ownership.model';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [ReactiveFormsModule, ImageFormComponent, VeterinarianFormComponent],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css',
})
export class AnimalFormComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Outputs events to the parent that the form is closed
  @Output() formClosed = new EventEmitter<void>();

  // Optional animal input to update
  @Input() animalToEdit: Animal | undefined = undefined;

  // Image and Veterinarian to edit
  public imageToEdit: Image | undefined = undefined;
  public veterinarianToEdit: Veterinarian | undefined = undefined;

  // Image and Veterinarian form components
  @ViewChild('imageForm') imageForm!: ImageFormComponent;
  @ViewChild('veterinarianForm') veterinarianForm!: VeterinarianFormComponent;

  // Services
  private authService = inject(AuthService);
  private animalService = inject(AnimalService);
  private genderService = inject(GenderService);
  private imageService = inject(ImageService);
  private veterinarianService = inject(VeterinarianService);
  private ownershipService = inject(UserAnimalOwnershipService);

  // New animal form
  public newAnimalForm = new FormGroup({
    chipNumber: new FormControl(''),
    animalName: new FormControl('', Validators.required),
    animalBirthName: new FormControl(''),
    animalBirthDate: new FormControl('', Validators.required),
    animalType: new FormControl('', Validators.required),
    animalBreed: new FormControl('', Validators.required),
    genderID: new FormControl('', Validators.required),
    animalColor: new FormControl('', Validators.required),
    animalDescription: new FormControl(''),
    sterile: new FormControl('', Validators.required),
    humanFriendly: new FormControl('', Validators.required),
    animalFriendly: new FormControl('', Validators.required),
    allergies: new FormControl(''),
  });

  // Genders from database
  public genders: Gender[] = [];

  // User interactions
  public isAddingVeterinarian = false;

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
    this.initGenders();
    this.initImageToEdit();
    this.initVeterinarianToEdit();
    this.initAnimalForm();
    this.setIsRequired();
    this.subscription.add(
      this.newAnimalForm.valueChanges.subscribe(() => {
        this.setIsRequired();
      })
    );
  }

  // Add the required css class to the required fields
  private setIsRequired(): void {
    for (const key in this.newAnimalForm.controls) {
      const control = this.newAnimalForm.get(key);
      document.getElementById(key)?.classList.remove('is-required');
      if (control?.value !== undefined && control?.getError('required')) {
        document.getElementById(key)?.classList.add('is-required');
      }
    }
  }

  // Init the genders from the database
  private initGenders(): void {
    this.subscription.add(
      this.genderService.getGenders().subscribe({
        next: (genders) => {
          this.genders = genders;
        },
      })
    );
  }

  // Init the image to edit according to the animal to edit
  private initImageToEdit(): void {
    if (!this.animalToEdit?.imageID) return;
    this.subscription.add(
      this.imageService.getImage(this.animalToEdit.imageID!).subscribe({
        next: (image) => {
          this.imageToEdit = image;
        },
      })
    );
  }

  // Init the veterinarian to edit according to the animal to edit
  private initVeterinarianToEdit(): void {
    if (!this.animalToEdit?.veterinarianID) return;
    this.subscription.add(
      this.veterinarianService
        .getVeterinarian(this.animalToEdit.veterinarianID!)
        .subscribe({
          next: (veterinarian) => {
            this.veterinarianToEdit = veterinarian;
          },
        })
    );
  }

  // Initialize the animal form
  private initAnimalForm(): void {
    if (!this.animalToEdit) return;
    this.subscription.add(
      this.animalService.getAnimal(this.animalToEdit.animalID!).subscribe({
        next: (animal) => {
          this.newAnimalForm.setValue({
            chipNumber: animal.chipNumber || null,
            animalName: animal.animalName,
            animalBirthName: animal.animalBirthName || null,
            animalBirthDate: new Date(animal.animalBirthDate)
              .toISOString()
              .split('T')[0],
            animalType: animal.animalType,
            animalBreed: animal.animalBreed,
            genderID: animal.genderID,
            animalColor: animal.animalColor,
            animalDescription: animal.animalDescription || null,
            sterile: animal.sterile ? 'true' : 'false',
            humanFriendly: animal.humanFriendly ? 'true' : 'false',
            animalFriendly: animal.animalFriendly ? 'true' : 'false',
            allergies: animal.allergies || null,
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

  // On adding veterinarian event
  public onAddVeterinarian(): void {
    this.isAddingVeterinarian = !this.isAddingVeterinarian;
  }

  // On close form event
  public onCloseForm(): void {
    this.formClosed.emit();
  }

  public onDeleteAnimal(): void {
    this.deleteAnimal();
    this.deleteOwnership();
    this.deleteImage();
    this.deleteVeterinarian();
  }

  public onSubmit(): void {
    this.subscription.add(
      this.submitImageForm()
        .pipe(
          switchMap((image) => {
            this.imageToEdit = image;
            return this.submitVeterinarianForm();
          }),
          switchMap((veterinarian) => {
            this.veterinarianToEdit = veterinarian;
            return this.submitAnimalForm();
          }),
          switchMap((animal) => {
            this.animalToEdit = animal;
            return this.addOwnership(animal);
          })
        )
        .subscribe({
          next: () => {
            this.onCloseForm();
          },
        })
    );
  }

  // ***** FORM SUBMIT *****

  // Submit the image form
  private submitImageForm(): Observable<Image | undefined> {
    if (!this.imageForm) return of(undefined);
    return this.imageForm.submitForm();
  }

  // Submit the veterinarian form
  private submitVeterinarianForm(): Observable<Veterinarian | undefined> {
    if (!this.veterinarianForm) return of(undefined);
    return this.veterinarianForm.submitForm();
  }

  // Submit the animal form
  private submitAnimalForm(): Observable<Animal | undefined> {
    const newAnimal: Animal | null = this.createAnimal();
    if (newAnimal) {
      return this.postAnimal(newAnimal);
    } else {
      return of(undefined);
    }
  }

  // Create a new animal
  private createAnimal(): Animal | null {
    if (!this.newAnimalForm.valid) return null;
    const newAnimal: Animal = {
      animalID: this.animalToEdit?.animalID,
      chipNumber: this.newAnimalForm.get('chipNumber')?.value || undefined,
      animalName: this.newAnimalForm.get('animalName')!.value!,
      animalBirthName:
        this.newAnimalForm.get('animalBirthName')?.value || undefined,
      animalBirthDate: new Date(
        this.newAnimalForm.get('animalBirthDate')!.value!
      ),
      animalType: this.newAnimalForm.get('animalType')?.value!,
      animalBreed: this.newAnimalForm.get('animalBreed')?.value!,
      genderID: this.newAnimalForm.get('genderID')?.value!,
      animalColor: this.newAnimalForm.get('animalColor')?.value!,
      animalDescription:
        this.newAnimalForm.get('animalDescription')?.value || undefined,
      sterile:
        this.newAnimalForm.get('sterile')?.value === 'true' ? true : false,
      humanFriendly:
        this.newAnimalForm.get('humanFriendly')?.value === 'true'
          ? true
          : false,
      animalFriendly:
        this.newAnimalForm.get('animalFriendly')?.value === 'true'
          ? true
          : false,
      allergies: this.newAnimalForm.get('allergies')?.value || undefined,
      imageID: this.imageToEdit?.imageID,
      veterinarianID: this.veterinarianToEdit?.veterinarianID,
    };
    return newAnimal;
  }

  // Post a veterinarian object to the database
  private postAnimal(animal: Animal): Observable<Animal> {
    if (this.animalToEdit) {
      return this.animalService.updateAnimal(
        this.animalToEdit.animalID!,
        animal
      );
    } else {
      return this.animalService.createAnimal(animal);
    }
  }

  // By default, create a relationship between the animal and the user
  public addOwnership(
    animal: Animal | undefined
  ): Observable<UserAnimalOwnership | undefined> {
    if (!animal) return of(undefined);
    const userID = this.authService.getCurrentUserId();
    return this.ownershipService.createUserAnimalOwnership({
      userID: userID,
      animalID: animal.animalID!,
    });
  }

  // ***** FORM DELETE ANIMAL *****

  // Delete the animal
  private deleteAnimal(): void {
    if (!this.animalToEdit) return;
    this.subscription.add(
      this.animalService.deleteAnimal(this.animalToEdit.animalID!).subscribe({
        next: () => {
          this.onCloseForm();
        },
      })
    );
  }

  // Delete the ownership
  private deleteOwnership(): void {
    if (!this.animalToEdit) return;
    const userID = this.authService.getCurrentUserId();
    this.subscription.add(
      this.ownershipService
        .deleteUserAnimalOwnership(userID, this.animalToEdit.animalID!)
        .subscribe()
    );
  }

  // Delete the image
  private deleteImage(): void {
    if (!this.imageToEdit) return;
    this.subscription.add(
      this.imageService.deleteImage(this.imageToEdit.imageID!).subscribe()
    );
  }

  // Delete the veterinarian
  private deleteVeterinarian(): void {
    if (!this.veterinarianToEdit) return;
    this.subscription.add(
      this.veterinarianService
        .deleteVeterinarian(this.veterinarianToEdit.veterinarianID!)
        .subscribe()
    );
  }
}
