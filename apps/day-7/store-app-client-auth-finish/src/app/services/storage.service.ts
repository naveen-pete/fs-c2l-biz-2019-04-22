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
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {
      console.log('Token not defined');
    }
    return token ? token : '';
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}