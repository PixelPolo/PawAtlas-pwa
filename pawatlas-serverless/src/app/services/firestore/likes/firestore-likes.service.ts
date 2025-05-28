import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Like } from '../../../models/interfaces/like';

@Injectable({
  providedIn: 'root',
})
export class FirestoreLikesService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private firestore = inject(Firestore);

  // Collection reference to the likes collection
  private likesCollection = collection(this.firestore, 'likes');

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS ON LIKES COLLECTION *****

  // POST a new like in the Firestore database
  public postLike(like: Like): Observable<any> {
    return from(addDoc(this.likesCollection, like));
  }

  // GET all the likes from the Firestore database
  public getLikes(): Observable<Like[]> {
    return collectionData(this.likesCollection, {
      idField: 'id',
    }) as Observable<Like[]>;
  }

  // DELETE a like from the Firestore database
  public deleteLike(id: string): Observable<void> {
    const likeDoc = doc(this.likesCollection, id);
    return from(deleteDoc(likeDoc));
  }

  // UPDATE a like in the Firestore database
  public updateLike(id: string, like: Like): Observable<void> {
    const likeDoc = doc(this.likesCollection, id);
    return from(setDoc(likeDoc, like));
  }

  // ***** OTHER OPERATIONS *****

  // GET a specific like from the Firestore database by its user id and marker id
  public getLikeByUserIDAndMarkerID(
    userID: string,
    markerID: string
  ): Observable<Like[]> {
    const q = query(
      this.likesCollection,
      where('userID', '==', userID),
      where('markerID', '==', markerID)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Like[]>;
  }

  // GET a like from the Firestore database by its id
  public getLikeByMarkerID(markerID: string): Observable<Like[]> {
    const q = query(this.likesCollection, where('markerID', '==', markerID));
    return collectionData(q, { idField: 'id' }) as Observable<Like[]>;
  }
}
