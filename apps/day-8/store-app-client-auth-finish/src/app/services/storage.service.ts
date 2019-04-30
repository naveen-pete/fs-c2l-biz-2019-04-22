import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveData(loginData) {
    const { token, user } = loginData;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    let token = localStorage.getItem('token');
    token = token || '';
    return token;
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user || {};
    return user;
  }

  removeData() {
    localStorage.clear();
  }
}
