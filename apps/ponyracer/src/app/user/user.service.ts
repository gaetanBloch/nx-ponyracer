import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);

  register(login: string, password: string, birthYear: number | null): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/api/users`, {
      login,
      password,
      birthYear,
    });
  }

  login(login: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/api/users/authentication`, {
      login,
      password,
    });
  }
}
