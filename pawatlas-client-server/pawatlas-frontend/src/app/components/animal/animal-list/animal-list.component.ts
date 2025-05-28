import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimalFormComponent } from '../../forms/animal-forms/animal-form/animal-form.component';
import { AuthService } from '../../../services/auth/auth.service';
import { AnimalService } from '../../../services/database/animal/animal.service';
import { Animal } from '../../../../models/database/animal.model';
import { ImageService } from '../../../services/database/image/image.service';
import { Image } from '../../../../models/database/image.model';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [DatePipe, AnimalFormComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css',
})
export class AnimalListComponent implements OnInit, OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private authService = inject(AuthService);
  private animalService = inject(AnimalService);
  private imageService = inject(ImageService);

  // User's animals
  public animals: Animal[] = [];

  // Images map
  public animalImages: { [key: string]: string } = {};

  // User interaction
  public isAddingAnimal = false;
  public animalToEdit: Animal | undefined;

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
    this.getUserAnimals();
  }

  // Get the user's ownerships from the database
  private getUserAnimals(): void {
    const userID = this.authService.getCurrentUserId();
    this.subscription.add(
      this.animalService.getAnimalsByUserID(userID).subscribe({
        next: (animals) => {
          this.animals = animals;
          this.getAnimalsImages(animals);
        },
      })
    );
  }

  // Get the animals images
  public getAnimalsImages(animals: Animal[]): void {
    for (const animal of animals) {
      if (animal.imageID) {
        this.subscription.add(
          this.imageService.getImage(animal.imageID).subscribe({
            next: (image: Image) => {
              this.animalImages[animal.animalID!] =
                this.imageService.createURL(image);
            },
          })
        );
      }
    }
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** USER INTERACTION *****

  public onAddAnimal(): void {
    this.isAddingAnimal = true;
  }

  public onEditAnimal(animal: Animal): void {
    this.animalToEdit = animal;
  }

  public onCloseAnimalForm(): void {
    this.isAddingAnimal = false;
    this.animalToEdit = undefined;
    this.getUserAnimals();
  }
}
