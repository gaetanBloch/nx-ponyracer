import { Route } from '@angular/router';
import { RacesComponent } from './races/races.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

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
];
