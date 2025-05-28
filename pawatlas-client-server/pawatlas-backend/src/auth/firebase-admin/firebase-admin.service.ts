import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  // Set up the Firebase Admin SDK
  private readonly firebaseApp: admin.app.App;

  constructor() {
    // Get the Firebase service account key from the environment variables
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}',
    );
    // Check if the service account key is provided
    if (!serviceAccount || !serviceAccount.private_key) {
      throw new Error('Firebase service account key is not provided');
    }
    // Initialize the Firebase Admin SDK
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // Verify the Firebase ID token
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.firebaseApp.auth().verifyIdToken(idToken);
  }
}
