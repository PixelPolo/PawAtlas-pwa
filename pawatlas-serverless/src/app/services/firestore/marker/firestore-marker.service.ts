import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Marker } from '../../../models/interfaces/marker';

@Injectable({
  providedIn: 'root',
})
export class FirestoreMarkerService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private firestore = inject(Firestore);

  // Collection reference to the marker collection
  private markerCollection = collection(this.firestore, 'marker');

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** CRUD OPERATIONS - ALL MARKERS *****

  // POST a new marker in the Firestore database
  public postMarker(marker: Marker): Observable<any> {
    return from(addDoc(this.markerCollection, marker));
  }

  // GET all the markers from the Firestore database
  public getMarkers(): Observable<Marker[]> {
    console.log('Using firestore service');
    return collectionData(this.markerCollection, { idField: 'id' }) as Observable<Marker[]>;
  }

  // DELETE a marker from the Firestore database
  public deleteMarker(id: string): Observable<void> {
    const markerDoc = doc(this.markerCollection, id);
    return from(deleteDoc(markerDoc));
  }

  // UPDATE a marker in the Firestore database
  public updateMarker(id: string, newMarker: Marker): Observable<void> {
    const markerDoc = doc(this.markerCollection, id);
    return from(setDoc(markerDoc, newMarker));
  }
}
