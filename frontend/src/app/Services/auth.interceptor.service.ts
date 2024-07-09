import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { UserServices } from './user.service';
import { inject } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  authService: UserServices = inject(UserServices);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.currentUserSubject.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          authorization: user.token,
        });
        const modifiedReq = req.clone({
          headers: headers,
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

// req objec is immutable
// {
//     "url": "http://localhost:5000/todo/register",
//     "body": {
//       "email": "sachin.aralapura@gmail.com",
//       "password": "sachin",
//       "userName": "sachin"
//     },
//     "reportProgress": false,
//     "withCredentials": false,
//     "responseType": "json",
//     "method": "POST",
//     "headers": {
//       "normalizedNames": {},
//       "lazyUpdate": null,
//       "headers": {}
//     },
//     "context": {
//       "map": {}
//     },
//     "params": {
//       "updates": null,
//       "cloneFrom": null,
//       "encoder": {},
//       "map": null
//     },
//     "urlWithParams": "http://localhost:5000/todo/register"
//   }

// examples
let request = {
  url: 'http://localhost:5000/todo/register',
  body: {
    email: 'sachin.aralapura@gmail.com',
    password: 'sachin',
    userName: 'sachin',
  },
  reportProgress: false,
  withCredentials: false,
  responseType: 'json',
  method: 'POST',
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
    headers: {},
  },
  context: {
    map: {},
  },
  params: {
    updates: null,
    cloneFrom: null,
    encoder: {},
    map: {},
  },
  urlWithParams: 'http://localhost:5000/todo/register',
};

let modified = {
  url: 'http://localhost:5000/todo/register',
  body: {
    email: 'sachin.aralapura@gmail.com',
    password: 'sachin',
    userName: 'sachin',
  },
  reportProgress: false,
  withCredentials: false,
  responseType: 'json',
  method: 'POST',
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
    headers: {},
    lazyInit: null,
  },
  context: {
    map: {},
  },
  params: {
    updates: null,
    cloneFrom: null,
    encoder: {},
    map: {},
  },
  urlWithParams: 'http://localhost:5000/todo/register',
};
