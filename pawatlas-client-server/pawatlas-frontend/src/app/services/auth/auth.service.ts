import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import {
  catchError,
  from,
  lastValueFrom,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../models/database/user.model';
import { UserService } from '../database/user/user.service';
import { Contact } from '../../../models/database/contact.model';
import { ContactService } from '../database/contact/contact.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firebaseAuth = inject(Auth);
  private contactService = inject(ContactService);
  private userService = inject(UserService);

  // Default user role
  private defaultRole = 'user';

  // Observable that emits the user state from Firebase Auth
  private user$: Observable<any>;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {
    // Get the user state from the Firebase Auth service
    this.user$ = authState(this.firebaseAuth);
    this.subscription.add(this.user$.subscribe());
  }

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ***** USER STATE AND GETTERS *****

  // Async function to check if the user is online
  public async isLogged(): Promise<boolean> {
    // lastValueFrom converts an observable to a promise
    const user = await lastValueFrom(this.user$.pipe(take(1)));
    return !!user;
  }

  // Get the email of the current logged user
  public getCurrentUserEmail(): string {
    return this.firebaseAuth.currentUser!.email!;
  }

  // Get the display name of the current logged user
  public getCurrentUserDisplayName(): string {
    return this.firebaseAuth.currentUser!.displayName!;
  }

  // Get the user id stored inside the Firebase Auth of the current logged user
  // Not the same as the Firestore user id
  public getCurrentUserId(): string {
    return this.firebaseAuth.currentUser!.uid!;
  }

  // Get the user token
  public async getToken(): Promise<string | undefined> {
    return this.firebaseAuth.currentUser!.getIdToken();
  }

  // ***** AUTHENTICATION WITH EMAIL AND PASSWORD *****

  // Register the user with email and password
  public register(
    displayName: string,
    email: string,
    password: string
  ): Observable<any> {
    // Check if the display name already exists
    return this.checkDisplayNameExists(displayName).pipe(
      switchMap(() => {
        // Register the user with email and password in Firebase Auth
        return this.registerWithFirebase(email, password, displayName);
      }),
      switchMap((userUUID: string) => {
        // Create a contact in the Database with the email
        return this.createContactInDatabase(email, userUUID, displayName);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.code || error.message));
      })
    );
  }

  // Check if the display name already exists
  private checkDisplayNameExists(displayName: string): Observable<void> {
    return this.userService.getUserByDisplayName(displayName).pipe(
      switchMap((user: User) => {
        if (user) {
          return throwError(() => new Error('auth/displayname-already-exists'));
        } else {
          return of(undefined);
        }
      })
    );
  }

  // Register the user with email and password in Firebase Auth
  private registerWithFirebase(
    email: string,
    password: string,
    displayName: string
  ): Observable<string> {
    return from(
      // Create a user with email and password in Firebase Auth
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        async (userCredential: UserCredential) => {
          // Update the display name in Firebase Auth
          await updateProfile(userCredential.user, {
            displayName: displayName,
          });
          return userCredential.user.uid;
        }
      )
    );
  }

  // Create a contact in the Database with the email
  private createContactInDatabase(
    email: string,
    userUUID: string,
    displayName: string
  ): Observable<Contact> {
    // Create a contact in the Database with the email
    return this.contactService.createContact({ email: email }).pipe(
      switchMap((contact: Contact) => {
        // Create a user in the Database with the other fields and the contact id
        return this.userService.createUser({
          userID: userUUID,
          displayName: displayName,
          roleID: this.defaultRole,
          contactID: contact.contactID,
        });
      })
    );
  }

  // Login the user with email and password
  public login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        () => {}
      )
    );
  }

  // ***** AUTHENTICATION WITH GOOGLE *****

  // Login the user with Google
  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    let email: string;
    let displayName: string;
    let userUUID: string;
    // Sign in with Google in Firebase Auth
    return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
      switchMap((response: UserCredential) => {
        // Save the user email, display name and id
        email = response.user.email!;
        displayName = response.user.displayName!;
        userUUID = response.user.uid;
        // Check if the user already exists in the Database
        return this.userService.getUserByDisplayName(displayName);
      }),
      switchMap((user: User) => {
        // If the user already exists, return undefined to stop the observable chain
        if (user) {
          return of(undefined);
        }
        // Create a contact in the Database with the email
        return this.contactService.createContact({ email: email });
      }),
      switchMap((contact: Contact | undefined) => {
        // If the contact does not exist, return undefined to stop the observable chain
        if (contact === undefined) {
          return of(undefined);
        }
        return this.userService.createUser({
          userID: userUUID,
          displayName: displayName,
          roleID: this.defaultRole,
          contactID: contact.contactID,
        });
      })
    );
  }

  // ***** AUTHENTICATION WITH APPLE *****

  // Login the user with Apple
  loginWithApple() {
    alert("Cette fonctionnalité n'est pas encore disponible");
  }

  // ***** AUTHENTICATION WITH FACEBOOK *****

  // Login the user with Facebook
  loginWithFacebook() {
    alert("Cette fonctionnalité n'est pas encore disponible");
  }

  // ***** LOGOUT *****

  // Logout the user
  public logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
