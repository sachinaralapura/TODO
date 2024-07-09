import { inject, Injectable } from '@angular/core';
import { AuthResponse, CurrentUser, User } from '../Models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';

@Injectable()
export class UserServices {
  http: HttpClient = inject(HttpClient);
  errorMessage: String | null = null;
  currentUserSubject: Subject<CurrentUser> = new Subject<CurrentUser>();

  registerUser(user: User) {
    return this.http
      .post<AuthResponse>('http://localhost:5000/todo/register', user)
      .pipe(
        catchError((err) => {
          this.setErrorMessage(err);
          return throwError(() => this.errorMessage);
        }),
        tap((res) => {
          this.createUser(res);
        })
      );
  }

  loginUser(email: string, password: string) {
    let user: User = new User(email, password);
    return this.http
      .post<AuthResponse>('http://localhost:5000/todo/login', user)
      .pipe(
        catchError((err) => {
          this.setErrorMessage(err);
          return throwError(() => this.errorMessage);
        }),
        tap((res) => {
          this.createUser(res);
        })
      );
  }

  createUser(res: AuthResponse) {
    let user: CurrentUser = new CurrentUser(res.email, res._id, res.token);
    this.currentUserSubject.next(user);
  }

  setErrorMessage(httpError: HttpErrorResponse) {
    this.errorMessage = httpError.error.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 1000);
  }
}
