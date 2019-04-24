import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  showMessage = false;
  @ViewChild('f') form;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);
    console.log(this.form.value);
    this.form.reset();
  }
}
