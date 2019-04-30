import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer: Customer;
  randomVal = Math.random();

  constructor() {
    this.customer = {
      id: 1,
      name: 'Nirmal',
      phone: '12345',
      email: 'nirmal@abc.com',
      isPrivileged: true
    };
  }

  ngOnInit() {}

  checkPrivilege() {
    return this.customer.isPrivileged ? 'Yes' : 'No';
  }

  getRandomNumber() {
    return Math.random();
  }
}
