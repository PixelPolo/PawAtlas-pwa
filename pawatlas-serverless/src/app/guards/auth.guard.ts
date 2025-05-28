import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
export const authGuard: CanActivateFn = async (route, state) => {
  // Services
  const authService = inject(AuthService);

  // Check if the user is logged in
  const isLoggedIn = await authService.isLogged();
  if (isLoggedIn) {
    return true;
  } else {
    return false;
  }
};
