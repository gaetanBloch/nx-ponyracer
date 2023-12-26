import { Route } from '@angular/router';
import { RacesComponent } from './races/races.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterTdComponent } from './register-td/register-td.component';
import { SimpleComponent } from './simple-form/simple.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    providers: [],
  },
  {
    path: 'races',
    component: RacesComponent,
    providers: [],
  },
  {
    path: 'register',
    component: RegisterComponent,
    providers: [],
  },
  {
    path: 'register-td',
    component: RegisterTdComponent,
    providers: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    providers: [],
  },
  {
    path: 'simple',
    component: SimpleComponent,
    providers: [],
  },
];
