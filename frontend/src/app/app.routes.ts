import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "signin", component: SignInComponent },
  { path: "login", component: LogInComponent },
  { path: "", redirectTo: "signin", pathMatch: "full" }
];
