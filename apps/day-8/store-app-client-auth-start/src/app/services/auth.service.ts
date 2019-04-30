import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

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
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('AuthService.handleError:', error);
    return throwError(new AppError(error));
  }
}
