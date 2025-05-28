import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Image } from '../../../../models/database/image.model';
import { ImageService } from '../../../services/database/image/image.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent implements OnInit, OnChanges {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Optional image input to update
  @Input() imageToEdit: Image | undefined = undefined;

  // Services
  private imageService = inject(ImageService);

  // Selected image file and URL
  public selectedImage: File | undefined = undefined;
  public imageURL: string | undefined = undefined;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Initialize the component
  public ngOnInit(): void {
    this.initImageURL();
  }

  // Initialize the component on input changes
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageToEdit']) {
      this.initImageURL();
    }
  }

  // Initialize the imageURL
  private initImageURL(): void {
    if (this.imageToEdit && this.imageToEdit.imageData) {
      this.imageURL = this.imageService.createURL(this.imageToEdit);
    }
  }

  // ***** EVENT HANDLERS *****

  // Handle the image selection
  public onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // ***** FORM SUBMISSION *****

  // Handle the form submission
  public submitForm(): Observable<Image | undefined> {
    if (this.selectedImage) {
      if (this.imageToEdit) {
        return this.imageService.updateImage(
          this.imageToEdit.imageID!,
          this.selectedImage
        );
      } else {
        return this.imageService.createImage(this.selectedImage);
      }
    } else {
      return of(undefined);
    }
  }
}
