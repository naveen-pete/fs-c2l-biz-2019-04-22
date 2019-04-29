import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { User } from '../models/user';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const user = this.form.value;
    this.authService.register(user).subscribe(
      (user: User) => {
        console.log('Register user successful!');
        console.log('user:', user);
        this.router.navigate(['/']);
      },
      (error: AppError) => {
        console.log('Register user failed!');
        console.log('Error:', error);
      }
    );
  }
}
