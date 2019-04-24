import { Component } from '@angular/core';

import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  searchText: string = '';

  products: Product[] = [
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

  onProductCreated(newProduct: Product) {
    this.products.unshift(newProduct);
  }
}
