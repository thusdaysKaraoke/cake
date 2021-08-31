import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private user: User;

  constructor(private httpClient: HttpClient) { }

  isLogged() {
    return !!this.user;
  }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(environment.serviceUrl + "login", { id: username, password: password }).pipe(tap(user => this.user = user))
  }


}
