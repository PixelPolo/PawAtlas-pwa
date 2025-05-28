import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  exhaustMap,
  forkJoin,
  Observable,
  of,
  Subscription,
  switchMap,
  throwError,
} from 'rxjs';
import { FirestoreMarkerService } from '../marker/firestore-marker.service';
import { Marker } from '../../../models/interfaces/marker';
import { AuthService } from '../../auth/auth.service';
import { FirestoreLikesService } from '../likes/firestore-likes.service';
import { Like } from '../../../models/interfaces/like';
import { StorageImageService } from '../../storage/storage-image.service';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

/*
This service is specific for the application pawatlas.
It is used to interact with the Firestore database.
It uses the generic services created in the folder firestore.
*/

// https://rxjs.dev/api/operators/exhaustMap
export class FirestorePawatlasService implements OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firestoreMarkerService = inject(FirestoreMarkerService);
  private firestoreLikesService = inject(FirestoreLikesService);
  private fileService = inject(StorageImageService);
  private authService = inject(AuthService);

  // User id from firestore
  private currentUserID: string = this.authService.getCurrentUserId();

  // Private subjects to control the emission of values
  private allMarkersSubject = new BehaviorSubject<Marker[]>([]);
  private userMarkersSubject = new BehaviorSubject<Marker[]>([]);

  // Public observables to expose the values
  public allMarkers$: Observable<Marker[]> =
    this.allMarkersSubject.asObservable();
  public userMarkers$: Observable<Marker[]> =
    this.userMarkersSubject.asObservable();

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {
    // Set the markers
    this.setMarkers();
  }

  // Set the markers
  private setMarkers(): void {
    // Get all markers from firestore
    this.subscription.add(
      this.getMarkers().subscribe({
        next: (markers: Marker[]) => {
          // Emit the values through the subjects
          this.allMarkersSubject.next(markers);
          // Filter and emit user markers
          const userMarkers = markers.filter(
            (marker) => marker.userID === this.currentUserID
          );
          this.userMarkersSubject.next(userMarkers);
        },
        error: (error) => {
          console.error('Error getting markers', error);
        },
      })
    );
  }

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** POST, UPDATE, GET and DELETE Markers *****

  // Check if the marker is from the current user
  public isUserMarker(marker: Marker): boolean {
    return marker.userID === this.currentUserID;
  }

  // POST a new marker by the current user
  // - set the userID of the marker
  // - set the date of the marker
  public postMarker(marker: Marker): Observable<any> {
    marker.userID = this.currentUserID;
    marker.date = Timestamp.now();
    return this.firestoreMarkerService.postMarker(marker);
  }

  // UPDATE a marker by the current user
  // - set the userID of the marker
  // - set the date of the marker
  // - update the image in firebase storage if a new image is provided
  public updateMarker(
    markerID: string,
    markerUserID: string,
    marker: Marker
  ): Observable<any> {
    // Set the userID and date
    marker.userID = markerUserID;
    marker.date = Timestamp.now();
    // Update the marker
    return this.firestoreMarkerService.updateMarker(markerID, marker);
  }

  // GET all markers
  public getMarkers(): Observable<Marker[]> {
    return this.firestoreMarkerService.getMarkers();
    // return this.firestoreMarkerHTTPService.getMarkers();
  }

  // DELETE a marker by the current user
  // - confirm the deletion
  // - delete the marker
  // - delete the marker's image
  // - delete all associated likes
  public deleteMarker(marker: Marker): Observable<any> {
    // Confirm the deletion
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
      return of(null);
    }
    // Delete the marker
    return this.firestoreMarkerService.deleteMarker(marker.id!).pipe(
      // Delete the image associated with the marker
      switchMap(() => {
        if (marker.image !== 'No image') {
          return this.fileService.deleteImageFromUrl(marker.image);
        } else {
          return of(null);
        }
      }),
      // Delete all likes associated with the marker
      switchMap(() =>
        this.firestoreLikesService.getLikeByMarkerID(marker.id!).pipe(
          switchMap((likes) => {
            if (likes.length === 0) {
              return of(null);
            }
            // Create an array of observables for deleting all likes
            const deleteLikesObservables = likes.map((like: Like) =>
              this.firestoreLikesService.deleteLike(like.id!)
            );
            // Use forkJoin to wait for all deletions to complete
            return forkJoin(deleteLikesObservables);
          })
        )
      )
    );
  }

  // ***** IMAGES Methods *****

  // Upload an image
  // - if the marker has an image, update the image
  // - if the marker does not have an image, upload a new image
  public uploadImage(file: File, marker: Marker | null): Observable<string> {
    if (marker && marker.image !== 'No image') {
      return this.fileService.updateImage(file, marker.image);
    }
    return this.fileService.uploadImage(file);
  }

  // Delete an image
  // - set the marker image to 'No image'
  // - update the marker in firestore
  // - delete the image from firebase storage
  public deleteImage(marker: Marker, imageUrl: string): void {
    marker.image = 'No image';
    this.firestoreMarkerService.updateMarker(marker.id!, marker);
    this.fileService.deleteImageFromUrl(imageUrl);
  }

  // ***** LIKE and DISLIKE Markers *****

  // Add a like to the marker
  public addLike(marker: Marker): Observable<any> {
    return this.handleLike(marker, true);
  }

  // Add a dislike to the marker
  // - If the marker has 1 dislikes, delete the marker
  public addDislike(marker: Marker): Observable<any> {
    if (marker.disapprovedVotes >= 0) {
      alert('Le lieu va être supprimé car il a reçu trop de votes négatifs...');
      return this.deleteMarker(marker);
    }
    return this.handleLike(marker, false);
  }

  // Function to handle the like/dislike of a marker
  // - update the marker votes
  // - update the like if it exists
  // - create a new like if it does not exist
  // - throw an error if the like already exists
  private handleLike(marker: Marker, isLike: boolean): Observable<any> {
    // Function to update the marker votes
    const updateMarkerVotes = (
      marker: Marker,
      isLike: boolean,
      isDislikeToLike: boolean
    ): Marker => {
      if (isLike) {
        return isDislikeToLike
          ? {
              // Convert dislike to like
              ...marker,
              approvedVotes: marker.approvedVotes + 1,
              disapprovedVotes: marker.disapprovedVotes - 1,
            }
          : {
              // Or add a like
              ...marker,
              approvedVotes: marker.approvedVotes + 1,
            };
      } else {
        return isDislikeToLike
          ? {
              // Convert like to dislike
              ...marker,
              approvedVotes: marker.approvedVotes - 1,
              disapprovedVotes: marker.disapprovedVotes + 1,
            }
          : {
              // Or add a dislike
              ...marker,
              disapprovedVotes: marker.disapprovedVotes + 1,
            };
      }
    };
    // Get the like type
    const likeType = isLike ? true : false;
    // Get the like by user id and marker id
    return this.firestoreLikesService
      .getLikeByUserIDAndMarkerID(this.currentUserID, marker.id!)
      .pipe(
        exhaustMap((likeData: any) => {
          if (likeData.length === 0) {
            // Like does not exist, create a new like
            const newLike: Like = {
              userID: this.currentUserID,
              markerID: marker.id!,
              like: likeType,
            };
            // Post the new like
            return this.firestoreLikesService.postLike(newLike).pipe(
              exhaustMap(() => {
                // Update the marker
                const newMarker = updateMarkerVotes(marker, isLike, false);
                return this.firestoreMarkerService.updateMarker(
                  marker.id!,
                  newMarker
                );
              })
            );
          } else if (likeData[0].like !== likeType) {
            // Like exists, update the like
            const updateLike: Like = {
              userID: this.currentUserID,
              markerID: marker.id!,
              like: likeType,
            };
            return (
              // Update the like
              this.firestoreLikesService
                .updateLike(likeData[0].id, updateLike)
                .pipe(
                  exhaustMap(() => {
                    // Update the marker
                    const newMarker = updateMarkerVotes(marker, isLike, true);
                    return this.firestoreMarkerService.updateMarker(
                      marker.id!,
                      newMarker
                    );
                  })
                )
            );
          } else {
            // Like already exists, throw an error
            return throwError(
              () =>
                new Error(
                  isLike
                    ? 'The like already exists'
                    : 'The dislike already exists'
                )
            );
          }
        })
      );
  }
}
