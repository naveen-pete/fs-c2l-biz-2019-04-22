import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      name: 'iPhone X',
      description: 'From Apple',
      price: 50000,
      isAvailable: false
    },
    {
      name: 'Samsung',
      description: 'From Samsung',
      price: 30000,
      isAvailable: true
    },
    {
      name: 'Mi',
      description: 'From Xiomi',
      price: 20000,
      isAvailable: true
    }
  ];

  // constructor(private logger: LoggerService) { }

  getProducts(): Product[] {
    console.log('ProductsService.getProducts() invoked.');
    return this.products;
  }

  addProduct(newProduct: Product) {
    console.log('ProductsService.addProduct() invoked.', newProduct);
    this.products.unshift(newProduct);
  }
}