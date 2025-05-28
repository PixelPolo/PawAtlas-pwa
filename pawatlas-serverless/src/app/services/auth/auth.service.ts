import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  from,
  lastValueFrom,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { FirestoreUserService } from '../firestore/user/firestore-user.service';
import { User } from '../../models/interfaces/user';

@Injectable({
  providedIn: 'root',
})
// TODO EMAIL CONFIRMATION
// TODO MODIFY IS LOGGED IN TO RETURN AN OBSERVABLE ? BUT HOW TO USE IT IN THE GUARD ?

// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
// https://firebase.google.com/docs/auth/web/start?hl=fr
// https://firebase.google.com/docs/reference/js/auth?hl=fr
// https://www.youtube.com/watch?v=586O934xrhQ&t=715s
// https://github.com/angular/angularfire/blob/master/docs/auth.md
// https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f
export class AuthService implements OnDestroy {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private firebaseAuth = inject(Auth);
  private firestoreUserService = inject(FirestoreUserService);

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
    return this.firebaseAuth.currentUser?.email!;
  }

  // Get the display name of the current logged user
  public getCurrentUserDisplayName(): string {
    return this.firebaseAuth.currentUser?.displayName!;
  }

  // Get the user id stored inside the Firebase Auth of the current logged user
  // Not the same as the Firestore user id
  public getCurrentUserId(): string {
    return this.firebaseAuth.currentUser?.uid!;
  }

  /*
    The following methods are used to register and login the user.
    They return an observable that emits a void value. 
    The observable is created from a promise returned by the Firebase Auth methods,
    which functionalities are wrapped with the Angular Fire Auth library.
    The observable is used in the components to subscribe to the result of the login or register methods.
    We use an observable instead of a promise because it is more flexible and easier to work with in Angular.
  */

  // ***** AUTHENTICATION WITH EMAIL AND PASSWORD *****

  // Check if display name already exists
  private checkDisplayNameExists(userName: string): Observable<boolean> {
    return this.firestoreUserService.getUserByDisplayName(userName).pipe(
      take(1),
      map((users: User[]) => {
        return users.length > 0;
      })
    );
  }

  // Check if email already exists
  private checkEmailExists(email: string): Observable<boolean> {
    return from(this.firestoreUserService.getUserByEmail(email)).pipe(
      take(1),
      map((users: User[]) => {
        return users.length > 0;
      })
    );
  }

  // Register a new user
  public register(
    userName: string,
    email: string,
    password: string
  ): Observable<any> {
    // Check if the display name already
    return this.checkDisplayNameExists(userName).pipe(
      switchMap((displayNameExists) => {
        if (displayNameExists) {
          return throwError(() => new Error('auth/displayname-already-exists'));
        }
        // Check if the email already exists
        return this.checkEmailExists(email);
      }),
      switchMap((emailExists) => {
        if (emailExists) {
          return throwError(() => new Error('auth/email-already-in-use'));
        }
        // Create a new user with email and password
        return from(
          createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
          ).then((response) => {
            // Update the user profile with the displayName (not done automatically)
            return updateProfile(response.user, { displayName: userName }).then(
              () => response.user.uid
            );
          })
        );
      }),
      switchMap((uid) => {
        // Post the user to the Firestore database
        const newUser: User = { uid: uid, email: email, displayName: userName };
        return this.firestoreUserService.postUser(newUser);
      })
    );
  }

  // Login the user
  public login(email: string, password: string): Observable<void> {
    return from(
      // Sign in with email and password
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        () => {}
      )
    );
  }

  // ***** AUTHENTICATION WITH GOOGLE *****

  // Login with Google
  public loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
      switchMap((response) => {
        const email = response.user.email!;
        const displayName = response.user.displayName!;
        const uid = response.user.uid;
        // Check if the email already exists
        return this.checkEmailExists(email).pipe(
          switchMap((emailExists) => {
            if (emailExists) {
              // Return undefined to stop the observable chain
              return of(undefined);
            }
            // Post the new user to the Firestore database
            const newUser: User = {
              uid: uid,
              email: email,
              displayName: displayName,
            };
            return this.firestoreUserService.postUser(newUser);
          })
        );
      })
    );
  }

  // ***** AUTHENTICATION WITH FACEBOOK *****

  // Login with Facebook
  public loginWithFacebook(): Observable<void> {
    // Not implemented, throw an error
    return throwError(() => new Error('auth/facebook-login-not-implemented'));
  }

  // ***** AUTHENTICATION WITH APPLE *****

  // Login with Apple
  public loginWithApple(): Observable<void> {
    // Not implemented, throw an error
    return throwError(() => new Error('auth/apple-login-not-implemented'));
  }

  // ***** LOGOUT *****

  // Logout the user
  public logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
