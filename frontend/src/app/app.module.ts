import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailsComponent } from './dashboard/task/task-details/task-details.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserServices } from './Services/user.service';
import { Router } from 'express';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorService } from './Services/auth.interceptor.service';
import { LoggingInterceptorService } from './Services/logging-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './dashboard/task/task.component';
import { SearchComponent } from './dashboard/search/search.component';
import { FilterComponent } from './dashboard/filter/filter.component';

const route: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TaskDetailsComponent,
    CreateTaskComponent,
    HeaderComponent,
    TaskComponent,
    SearchComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(route),
  ],
  providers: [
    provideClientHydration(),
    UserServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
