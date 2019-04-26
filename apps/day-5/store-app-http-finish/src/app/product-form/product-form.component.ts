import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number;
  product: Product;
  addNew: boolean;
  @ViewChild('f') productForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService
  ) {
    this.product = new Product();
    this.addNew = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.id = +map.get('id');

      if (!this.id || isNaN(this.id)) {
        console.log(`Invalid product id. (id: ${this.id})`);
        return;
      }

      this.service.getProduct(this.id).subscribe(
        (product) => {
          this.product = product;
          this.addNew = false;
        },
        (error: AppError) => {
          console.log('Get product failed.');
          console.log('Error:', error);
        }
      );
    });
  }

  onSubmit() {
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.price = +this.productForm.value.price;
    this.product.isAvailable = this.productForm.value.isAvailable
      ? this.productForm.value.isAvailable
      : false;

    if (this.addNew) {
      this.service.addProduct(this.product).subscribe(
        (product) => {
          console.log('Success: New product:', product);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Add product failed.');
          console.log(error);
        }
      );
    } else {
      this.service.updateProduct(this.id, this.product).subscribe(
        (product) => {
          console.log('Success: Updated product:', product);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Update product failed.');
          console.log(error);
        }
      );
    }
  }
}
