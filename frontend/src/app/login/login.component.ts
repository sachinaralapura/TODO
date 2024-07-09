import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserServices } from '../Services/user.service';
import { Router } from '@angular/router';

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

  loginUser() {
    this.userservice
      .loginUser(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (_data) => {
          this.router.navigateByUrl('dashboard');
        },
        error: (err) => (this.errorMessage = err),
        complete: () => console.log('login complete'),
      });
  }
}
