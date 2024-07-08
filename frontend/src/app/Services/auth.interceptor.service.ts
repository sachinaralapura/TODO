import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'sldkfjasdlkj;sld'),
    });
    return next.handle(modifiedReq);
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
