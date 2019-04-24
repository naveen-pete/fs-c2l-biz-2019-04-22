import { ActivatedRoute, Router } from '@angular/router';
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
  product: Product = new Product();
  id: number;
  addNew = true; // boolean to decide if the form is used to add or update a product

  constructor(
    private productsService: ProductsService,
    private loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((map) => {
      this.id = +map.get('id');
      if (isNaN(this.id) || !this.id) { return; }

      const product = this.productsService.getProduct(this.id);
      if (this.product) {
        // if product exists, the form is used for updating the product
        this.addNew = false;
        // make a copy of the product object
        this.product = Object.assign({}, product);
      } else {
        // if product does not exist, ensure that the product object is not null to avoid
        // null reference exception
        this.product = new Product();
      }
    });
  }

  onSave() {
    this.loggingService.logMessage('Product Form - Save button clicked.');

    if (this.addNew) {
      this.productsService.addProduct(this.product);
    } else {
      this.productsService.updateProduct(this.id, this.product);
    }

    this.router.navigate(['/products']);
  }
}
