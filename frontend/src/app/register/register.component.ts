import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserServices } from '../Services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('formRef') form: NgForm;
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  userservice: UserServices = inject(UserServices);
  errorMessage: String = '' || null;
  subscription: Subscription;

  ngOnInit(): void {
    // this.subscription = this.userservice.errorSubject.subscribe({
    //   next: (httpErr) => this.setErrorMessage(httpErr),
    // });
  }

  setErrorMessage(httpError: HttpErrorResponse) {
    this.errorMessage = httpError.error.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 1000);
  }

  registerUser() {
    let user: User = new User(
      this.form.value.email,
      this.form.value.password,
      this.form.value.username
    );

    this.userservice.registerUser(user).subscribe({
      next: (data) => console.log(`register returned : ${data}`),
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('register complete'),
    });
    // this.router.navigateByUrl('dashboard');
  }
}
