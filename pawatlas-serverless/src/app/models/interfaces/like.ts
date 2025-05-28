/*
An interface in typescript is a syntactical contract that an entity should conform to.
In other words, an interface defines the syntax that any entity must adhere to.
Interfaces define properties, methods, and events, which are the members of the interface.
This file contains the Marker interface for the markers in the firestore database
*/

// The Like interface
export interface Like {
  id?: string; // Firestore will generate the id
  userID: string;
  markerID: string;
  like: boolean;
}
