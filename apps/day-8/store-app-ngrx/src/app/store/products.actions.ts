import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class CreateProduct implements Action {
  readonly type = CREATE_PRODUCT;

  constructor(public payload: Product) {}
}

export type ActionType =
  | GetProducts
  | AddProduct
  | SetProducts
  | FetchProducts
  | CreateProduct;
