import { Component, inject } from '@angular/core';
import { UserServices } from '../Services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userservice: UserServices = inject(UserServices);
  isUserIn: boolean = false;
  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.userservice.currentUserSubject.subscribe(
      (user) => {
        this.isUserIn = user ? true : false;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
