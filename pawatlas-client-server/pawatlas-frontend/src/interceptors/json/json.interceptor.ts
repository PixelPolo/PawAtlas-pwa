import { HttpInterceptorFn } from '@angular/common/http';

export const jsonInterceptor: HttpInterceptorFn = (req, next) => {
  /*
  // Skip setting Content-Type for multipart/form-data requests DOES NOT WORK
  if (req.headers.get('Content-Type')?.startsWith('multipart/form-data')) {
    return next(req);
  }

  // Only set Content-Type to application/json if not a multipart/form-data request
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });
  return next(clonedRequest);
  */
  return next(req);
};
