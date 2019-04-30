import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { AppError } from '../common/app-error';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  userId: number;

  constructor(
    private service: ProductsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.userId = this.storageService.getUser().id;

    this.service.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: AppError) => {
        console.log('Get products failed!');
        console.log('error:', error);
      }
    );
  }

  onDelete(productId) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(productId).subscribe(
        () => {
          console.log(`Delete product successful. (id: ${productId})`);
          this.products = this.products.filter(product => product.id !== productId);
        },
        (error: AppError) => {
          console.log('Delete product failed.');
          console.log('Error:', error);
        }
      );
    }
  }

  isAuthorized(product: Product) {
    return product.createdUserId === this.userId;
  }
}
