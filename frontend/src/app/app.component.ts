import { Component, inject } from '@angular/core';
import { UserServices } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userService: UserServices = inject(UserServices);
  title = 'frontend';

  ngOnInit(): void {
    this.userService.autoLogin();
  }
}
