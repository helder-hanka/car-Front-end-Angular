import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class InterceptorService implements HttpInterceptor {
//   constructor() {}

//   // intercept(
//   //   req: HttpRequest<any>,
//   //   next: HttpHandler
//   // ): Observable<HttpEvent<any>> {
//   //   console.log('Interceptor triggered:', req);
//   //   const token = localStorage.getItem('token');
//   //   console.log('TOKEN: ', token);
//   //   // if (token) {
//   //   //   // Clone the request to add the new header
//   //   //   const clonedRequest = req.clone({
//   //   //     setHeaders: {
//   //   //       Authorization: `Bearer ${token}`,
//   //   //     },
//   //   //   });
//   //   //   // Pass the cloned request instead of the original request to the next handler
//   //   //   return next.handle(clonedRequest);
//   //   // }
//   //   // return next.handle(req);

//   //   if (token) {
//   //     const cloned = req.clone({
//   //       headers: req.headers.set('Authorization', 'Bearer ' + token),
//   //     });

//   //     return next.handle(cloned);
//   //   } else {
//   //     return next.handle(req);
//   //   }
//   // }
// }

export const InterceptorService: HttpInterceptorFn = (req: any, next: any) => {
  const token = localStorage.getItem('token');
  let requestToSend = req;

  if (token) {
    const headers = req.headers.set('Authorization', 'Bearer ' + token);
    requestToSend = req.clone({ headers });
  }
  return next(requestToSend);
};
