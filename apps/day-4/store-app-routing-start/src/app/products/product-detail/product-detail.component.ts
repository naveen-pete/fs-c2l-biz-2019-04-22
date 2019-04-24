import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number = 1;

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.product = this.productsService.getProduct(this.id);
  }

  onEdit() {
    this.loggingService.logMessage('Product Detail - Edit button clicked.');
  }

  onDelete() {
    this.loggingService.logMessage('Product Detail - Delete button clicked.');
  }
}
