import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Like } from '../../../../models/database/like.model';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { MarkerService } from '../marker/marker.service';
import { Marker } from '../../../../models/database/marker.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  // ******************
  // ***** FIELDS *****
  // ******************

  private apiURL: string = environment.apiURL + '/likes';
  private http = inject(HttpClient);

  private markerService = inject(MarkerService);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ****************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS *****

  // Create a new like
  public createLike(like: Like): Observable<Like> {
    return this.http.post<Like>(this.apiURL, like);
  }

  // Get all the likes
  public getLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(this.apiURL);
  }

  // Get a like by ID
  public getLike(userID: string, markerID: string): Observable<Like> {
    return this.http.get<Like>(`${this.apiURL}/${userID}/${markerID}`);
  }

  // Update a like
  public updateLike(
    userID: string,
    markerID: string,
    like: Like
  ): Observable<Like> {
    return this.http.patch<Like>(`${this.apiURL}/${userID}/${markerID}`, like);
  }

  // Delete a like
  public deleteLike(likeID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${likeID}`);
  }

  // ***** OTHER OPERATIONS *****

  // Like a marker
  public likeMarker(userID: string, marker: Marker): Observable<any> {
    return this.getLike(userID, marker.markerID!).pipe(
      switchMap((like) => {
        let markerUpdate$: Observable<Marker>;
        let likeUpdate$: Observable<Like>;
        let markerAdjusted: Marker;
        if (like && like.isLiking) {
          return of(undefined);
        } else if (like && !like.isLiking) {
          markerAdjusted = this.adjustMarker(marker, 1, -1);
          markerUpdate$ = this.markerService.updateMarker(
            marker.markerID!,
            markerAdjusted
          );
          likeUpdate$ = this.updateLike(userID, marker.markerID!, {
            ...like,
            isLiking: true,
          });
        } else {
          markerAdjusted = this.adjustMarker(marker, 1, 0);
          markerUpdate$ = this.markerService.updateMarker(
            marker.markerID!,
            markerAdjusted
          );
          likeUpdate$ = this.createLike({
            userID: userID,
            markerID: marker.markerID!,
            isLiking: true,
          });
        }
        return forkJoin([markerUpdate$, likeUpdate$]);
      })
    );
  }

  // Dislike a marker
  public dislikeMarker(userID: string, marker: Marker) {
    return this.getLike(userID, marker.markerID!).pipe(
      switchMap((like) => {
        let markerUpdate$: Observable<Marker>;
        let likeUpdate$: Observable<Like>;
        let markerAdjusted: Marker;

        if (like && !like.isLiking) {
          return of(undefined);
        } else if (like && like.isLiking) {
          markerAdjusted = this.adjustMarker(marker, -1, 1);
          markerUpdate$ = this.markerService.updateMarker(
            marker.markerID!,
            markerAdjusted
          );
          likeUpdate$ = this.updateLike(userID, marker.markerID!, {
            ...like,
            isLiking: false,
          });
        } else {
          markerAdjusted = this.adjustMarker(marker, 0, 1);
          markerUpdate$ = this.markerService.updateMarker(
            marker.markerID!,
            markerAdjusted
          );
          likeUpdate$ = this.createLike({
            userID: userID,
            markerID: marker.markerID!,
            isLiking: false,
          });
        }
        return forkJoin([markerUpdate$, likeUpdate$]);
      })
    );
  }

  private adjustMarker(
    marker: Marker,
    approvedVotesInc: number,
    disapprovedVotesInc: number
  ): Marker {
    let approvedVotes = marker.markerApprovedVotes! + approvedVotesInc;
    if (approvedVotes < 0) approvedVotes = 0;
    let disapprovedVotes = marker.markerDisapprovedVotes! + disapprovedVotesInc;
    if (disapprovedVotes < 0) disapprovedVotes = 0;
    const newMarker: Marker = {
      markerLat: marker.markerLat,
      markerLng: marker.markerLng,
      markerName: marker.markerName,
      markerDescription: marker.markerDescription,
      markerApprovedVotes: approvedVotes,
      markerDisapprovedVotes: disapprovedVotes,
      categoryID: marker.categoryID,
      contactID: marker.contactID,
      addressID: marker.addressID,
      imageID: marker.imageID,
    };
    return newMarker;
  }
}
