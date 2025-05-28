import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../app/services/auth/auth.service';

export const authGuard: CanActivateFn = async () => {
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
