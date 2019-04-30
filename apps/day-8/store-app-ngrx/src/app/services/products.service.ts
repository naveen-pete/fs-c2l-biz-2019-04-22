import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  productCreated = new EventEmitter<Product>();

  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 8',
      description: 'Product from Apple',
      price: 60000,
      isAvailable: false
    },
    {
      id: 2,
      name: 'Samsung Galaxy S8',
      description: 'Product from Samsung',
      price: 50000,
      isAvailable: true
    },
    {
      id: 3,
      name: 'Moto G',
      description: 'Product from Motorola',
      price: 30000,
      isAvailable: true
    }
  ];
  constructor() {}

  getProducts() {
    console.log('ProductsService.getProducts() called!');
    return this.products;
  }

  addProduct(product: Product) {
    console.log('ProductsService.addProduct() called!');
    this.products.unshift(product);
    this.productCreated.emit(product);
  }
}
