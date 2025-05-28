import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { getApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  persistentLocalCache,
  initializeFirestore,
  persistentMultipleTabManager,
} from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { provideHttpClient } from '@angular/common/http';

// https://medium.com/@smarth55/extending-the-angular-cli-service-worker-44bfc205894c
// https://medium.com/@zeeshankhan8838/mastering-web-service-workers-in-angular-a-comprehensive-guide-8a6ebad4ac29
// https://www.angulartraining.com/daily-newsletter/how-to-cache-http-requests-with-a-service-worker/
// https://borstch.com/blog/development/optimizing-angular-application-with-service-worker/
// https://mohanbyte.medium.com/mastering-progressive-web-apps-with-angular-a-comprehensive-guide-10fc221d9cd9/
// https://github.com/amitai10/angular-api-cache
// https://github.com/angular/angularfire/blob/master/docs/auth.md
// https://github.com/angular/angularfire/blob/master/docs/firestore.md
// https://stackoverflow.com/questions/76360555/angular-16-enableindexeddbpersistence
export const appConfig: ApplicationConfig = {
  providers: [
    // Provide the zone change detection
    // Zone change detection is a feature that allows Angular
    // to detect changes in the application
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Provide the router configuration
    provideRouter(routes),

    // Service Worker for PWA
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),

    // Provide the Firebase app
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Provide the Firebase Auth service
    provideAuth(() => getAuth()),

    // Firestore service
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        // Offline persistence
        localCache: persistentLocalCache({
          // Multiple tab support
          tabManager: persistentMultipleTabManager(),
        }),
      })
    ),

    // Provide the HttpClient
    provideHttpClient(),
  ],
};
