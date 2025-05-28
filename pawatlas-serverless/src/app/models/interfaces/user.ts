/*
An interface in typescript is a syntactical contract that an entity should conform to.
In other words, an interface defines the syntax that any entity must adhere to.
Interfaces define properties, methods, and events, which are the members of the interface.
This file contains the Marker interface for the markers in the firestore database
*/

// The User interface
export interface User {
  uid?: string; // Register will set the same as the Firebase Auth uid
  email: string;
  displayName: string;
}
