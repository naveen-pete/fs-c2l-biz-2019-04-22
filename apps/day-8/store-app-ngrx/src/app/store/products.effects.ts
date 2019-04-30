import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';

import {
  FETCH_PRODUCTS,
  SetProducts,
  CREATE_PRODUCT,
  AddProduct,
  CreateProduct
} from './products.actions';
import { Product } from '../models/product';

@Injectable()
export class ProductsEffects {
  @Effect()
  fetchProducts = this.actions
    .ofType(FETCH_PRODUCTS)
    .switchMap(() => {
      return this.http.get<Product[]>('http://localhost:3000/products');
    })
    .map(products => {
      console.log('ProductsEffects -> products:', products);
      return new SetProducts(products);
    });

  @Effect()
  addProduct = this.actions
    .ofType(CREATE_PRODUCT)
    .switchMap((action: CreateProduct) => {
      return this.http.post<Product>(
        'http://localhost:3000/products',
        action.payload
      );
    })
    .map(product => {
      console.log('product added successfully', product);
      return new AddProduct(product);
    });

  constructor(private actions: Actions, private http: HttpClient) {}
}
