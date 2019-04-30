import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AppError } from '../common/app-error';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe(
      (loginData) => {
        console.log('Login successful.');
        console.log('loginData:', loginData);
        this.storageService.saveData(loginData);
        this.router.navigate(['/products']);
      },
      (error: AppError) => {
        console.log('Login failed!');
        console.log('Error:', error);
      }
    )
  }
}
