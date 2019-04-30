import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user';
import { AppError } from '../common/app-error';
import { StorageService } from './storage.service';
import { LoginData } from '../models/login-data';

export class AuthEventArg {
  event: string;
  userName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private authEvent = new Subject<AuthEventArg>();

  get AuthEvent() {
    return this.authEvent.asObservable();
  }

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  isAuthenticated() {
    const token = this.storageService.getToken();
    return token ? true : false;
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError(this.handleError)
      );

  }

  login(email: string, password: string) {
    const credentials = { email, password };
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((loginData: LoginData) => {
          this.storageService.saveData(loginData);

          this.authEvent.next({
            event: 'login',
            userName: loginData.user.name
          });
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.storageService.removeData();

    this.authEvent.next({
      event: 'logout',
      userName: ''
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.log('AuthService.handleError:', error);
    return throwError(new AppError(error));
  }
}
