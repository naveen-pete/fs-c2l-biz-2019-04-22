import { Component, ViewChild, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';

import { LoggerService } from '../services/logger.service';
import { ProductsService } from '../services/products.service';

import { FetchProducts } from '../store/products.actions';
import { AppState } from '../store/app.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  searchText = '';

  constructor(
    private loggerService: LoggerService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select('products')
      .subscribe(products => (this.products = products));

    this.store.dispatch(new FetchProducts());
  }
}
