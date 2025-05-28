import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { deleteDoc, setDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../../../models/interfaces/user';

@Injectable({
  providedIn: 'root',
})
// https://github.com/angular/angularfire/blob/master/docs/firestore.md
// https://firebase.google.com/docs/reference/js/firestore_
// https://rxjs.dev/api/index/function/throwError
// https://www.youtube.com/watch?v=0ihoworuX4o
export class FirestoreUserService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private firestore = inject(Firestore);

  // Collection reference to the user collection
  private userCollection = collection(this.firestore, 'user');

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS ON USERS COLLECTION *****

  // POST a new user in the Firestore database, with its email and display name
  public postUser(user: User): Observable<any> {
    return from(addDoc(this.userCollection, user));
  }

  // GET all the users from the Firestore database
  public getUsers(): Observable<User[]> {
    return collectionData(this.userCollection) as Observable<User[]>;
  }

  // DELETE a user from the Firestore database
  public deleteUser(id: string): Observable<void> {
    const userDoc = doc(this.userCollection, id);
    return from(deleteDoc(userDoc));
  }

  // UPDATE a user in the Firestore database and return it
  public updateUser(id: string, user: User): Observable<void> {
    const userDoc = doc(this.userCollection, id);
    return from(setDoc(userDoc, user));
  }

  // ***** OTHER OPERATIONS *****

  // GET a user from the Firestore database by its email address
  public getUserByEmail(email: string): Observable<User[]> {
    const q = query(this.userCollection, where('email', '==', email));
    return collectionData(q) as Observable<User[]>;
  }

  // GET a user from the Firestore database by its display name
  public getUserByDisplayName(displayName: string): Observable<User[]> {
    const q = query(
      this.userCollection,
      where('displayName', '==', displayName)
    );
    return collectionData(q) as Observable<User[]>;
  }
}
