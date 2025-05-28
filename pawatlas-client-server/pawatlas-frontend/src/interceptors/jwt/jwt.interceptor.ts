import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../app/services/auth/auth.service';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // If the request come from the users/displayName endpoint, we don't need to add the token
  // Because the users endpoint is public (for registration, before creating a user with Firebase and gain a token)
  if (req.url.startsWith(environment.apiURL + '/users/displayName/')) {
    return next(req);
  }

  const authService = inject(AuthService);
  return from(authService.getToken()).pipe(
    switchMap((token) => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    })
  );
};
