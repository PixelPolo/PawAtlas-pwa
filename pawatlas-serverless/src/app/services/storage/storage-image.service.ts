import { Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { from, max, Observable, switchMap } from 'rxjs';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root',
})
// https://firebase.google.com/docs/storage/web/start?hl=fr
// https://firebase.google.com/docs/storage/web/create-reference?hl=fr
// https://firebase.google.com/docs/storage/web/upload-files?hl=fr
// https://www.npmjs.com/package/browser-image-compression
export class StorageImageService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Storage reference to the images folder
  storage = getStorage();
  imagesRef = ref(this.storage, 'images');

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  /*
    The name of an image is the date and time of the upload.
  */

  // Upload a File
  uploadImage(file: File): Observable<any> {
    // Options for the image compression
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    // Compress the image
    return from(imageCompression(file, options)).pipe(
      switchMap((compressedFile) => {
        // Get the date and time of the upload
        const now = new Date();
        // Create a reference to the file with the date and time as the name
        const storageRef = ref(this.storage, 'images/' + now);
        return from(uploadBytes(storageRef, compressedFile)).pipe(
          switchMap((snapshot) => {
            // Return the download url of the file
            return from(getDownloadURL(snapshot.ref));
          })
        );
      })
    );
  }

  // Delete a File from its url
  deleteImageFromUrl(url: string): Observable<any> {
    const imageRef = ref(this.storage, url);
    return from(deleteObject(imageRef));
  }

  // Get a file from its url
  getImageFromUrl(url: string): Observable<any> {
    const imageRef = ref(this.storage, url);
    return from(getDownloadURL(imageRef));
  }

  // Update a file
  updateImage(file: File, url: string): Observable<any> {
    return this.deleteImageFromUrl(url).pipe(
      switchMap(() => {
        return this.uploadImage(file);
      })
    );
  }
}
