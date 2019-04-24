import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product;
  id: number = 3;

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.product = this.productsService.getProduct(this.id);
  }

  onSave() {
    this.loggingService.logMessage('Product Form - Save button clicked.');
  }
}
