import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from '../models/product';
import { LoggerService } from '../services/logger.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  showMessage: boolean = false;

  constructor(private logger: LoggerService, private productsService: ProductsService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.product);
    this.productsService.addProduct(this.product);

    this.product = new Product();
    this.showMessage = true;

    this.logger.log('New product submitted.');

    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }
}
