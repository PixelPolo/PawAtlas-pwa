import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const relativeUrl = req.url.split('/').slice(3).join('/');
        console.log(
          `Request Method: ${req.method} \n Path: ${relativeUrl} \n Status: ${event.status}`
        );
        // Log the error if any
        if (event.status >= 400) {
          console.error('Error:', event.body);
        }
      }
    })
  );
};
