import { inject, Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserServices {
  http: HttpClient = inject(HttpClient);
  errorSubject: HttpErrorResponse;
  errorMessage: String | null = null;

  registerUser(user: User) {
    return this.http.post('http://localhost:5000/todo/register', user).pipe(
      catchError((err) => {
        this.setErrorMessage(err);
        return throwError(() => this.errorMessage);
      })
    );
  }

  loginUser(user: User) {
    return this.http.post('http://localhost:5000/todo/login', user).pipe(
      catchError((err) => {
        this.setErrorMessage(err);
        return throwError(() => this.errorMessage);
      })
    );
  }

  setErrorMessage(httpError: HttpErrorResponse) {
    this.errorMessage = httpError.error.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 1000);
  }
}
