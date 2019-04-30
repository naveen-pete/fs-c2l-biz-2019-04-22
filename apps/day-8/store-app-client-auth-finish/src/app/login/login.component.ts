import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AppError } from '../common/app-error';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe(
      (loginData) => {
        console.log('Login successful.');
        this.router.navigate(['/products']);
      },
      (error: AppError) => {
        console.log('Login failed!');
        console.log('Error:', error);
      }
    )
  }
}
