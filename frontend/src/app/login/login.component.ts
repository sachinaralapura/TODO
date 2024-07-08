import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserServices } from '../Services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('formRef') form: NgForm;
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  userservice: UserServices = inject(UserServices);
  errorMessage: String = '' || null;

  // setErrorMessage(httpError: HttpErrorResponse) {
  //   this.errorMessage = httpError.error.message;
  //   setTimeout(() => {
  //     this.errorMessage = null;
  //   }, 1000);
  // }

  loginUser() {
    let user: User = new User(this.form.value.email, this.form.value.password);
    this.userservice.loginUser(user).subscribe({
      next: (data) => console.log(`login returned : ${data}`),
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('login complete'),
    });
    // this.form.reset();
    // this.router.navigateByUrl('dashboard');
  }
}
