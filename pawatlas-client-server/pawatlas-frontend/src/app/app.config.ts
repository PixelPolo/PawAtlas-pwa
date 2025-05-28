import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jsonInterceptor } from '../interceptors/json/json.interceptor';
import { jwtInterceptor } from '../interceptors/jwt/jwt.interceptor';
import { loggingInterceptor } from '../interceptors/logger/logging.interceptor';
import { spinnerInterceptor } from '../interceptors/spinner/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide the zone change detection
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Provide the router
    provideRouter(routes),
    // Provide the service worker
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // Provide the Firebase app
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Provide the Firebase Auth service
    provideAuth(() => getAuth()),
    // Provide the HttpClient service with interceptors
    provideHttpClient(
      withInterceptors([
        // loggingInterceptor,  // FOR DEBUGGING IN DEVELOPMENT
        spinnerInterceptor,
        jsonInterceptor,
        jwtInterceptor,
      ])
    ),
    // Provide the Firebase Analytics service
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
  ],
};
