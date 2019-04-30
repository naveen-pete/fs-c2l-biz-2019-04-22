import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.productCreated.subscribe((product: Product) => {
      console.log('Received new product instance:', product);
    });
  }
}
