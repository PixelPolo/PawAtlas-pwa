import { GeoPoint, Timestamp } from 'firebase/firestore';

/*
An interface in typescript is a syntactical contract that an entity should conform to.
In other words, an interface defines the syntax that any entity must adhere to.
Interfaces define properties, methods, and events, which are the members of the interface.
This file contains the Marker interface for the markers in the firestore database
*/

// The Marker interface
export interface Marker {
  id?: string; // Firestore will generate the id
  userID?: string; // Post service will add the current user id
  date?: Timestamp; // Updated when posting the marker
  location: GeoPoint;
  type: string;
  category: string;
  name: string;
  description: string;
  image: string;
  approvedVotes: number;
  disapprovedVotes: number;
}
