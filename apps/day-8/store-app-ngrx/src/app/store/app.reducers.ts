import { ActionReducerMap } from '@ngrx/store';
import { Product } from '../models/product';
import { productsReducer } from './products.reducers';

export interface AppState {
  products: Product[];
}

export const appReducers: ActionReducerMap<AppState> = {
  products: productsReducer
};
