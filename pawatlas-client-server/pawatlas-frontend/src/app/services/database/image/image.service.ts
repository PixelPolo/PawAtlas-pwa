import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { Image } from '../../../../models/database/image.model';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/images';
  private http = inject(HttpClient);

  private options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // POST /images/upload
  createImage(file: File): Observable<Image> {
    return from(imageCompression(file, this.options)).pipe(
      switchMap((compressedFile) => {
        const formData = new FormData();
        formData.append('image', compressedFile);
        return this.http.post<Image>(`${this.apiURL}/upload`, formData);
      })
    );
  }

  // GET /images
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiURL);
  }

  // GET /images/:id
  getImage(imageID: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiURL}/${imageID}`);
  }

  // PATCH /images/:id
  updateImage(imageID: string, file: File): Observable<Image> {
    return from(imageCompression(file, this.options)).pipe(
      switchMap((compressedFile) => {
        const formData = new FormData();
        formData.append('image', compressedFile);
        return this.http.patch<Image>(`${this.apiURL}/${imageID}`, formData);
      })
    );
  }

  // DELETE /images/:id
  deleteImage(imageID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${imageID}`);
  }

  // ***** OTHERS *****

  // Create an object URL from a Blob
  createURL(image: Image): string {
    const byteArray = new Uint8Array((image.imageData as any).data);
    const blob = new Blob([byteArray], {
      type: image.imageMimeType,
    });
    return URL.createObjectURL(blob);
  }
}
