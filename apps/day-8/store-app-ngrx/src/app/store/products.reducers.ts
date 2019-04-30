import { Product } from '../models/product';
import * as ProductsActions from './products.actions';

const initialState: Product[] = [];

export function productsReducer(
  state = initialState,
  action: ProductsActions.ActionType
) {
  switch (action.type) {
    case ProductsActions.GET_PRODUCTS:
      return [...state];

    case ProductsActions.SET_PRODUCTS:
      return [...state, ...action.payload];

    case ProductsActions.ADD_PRODUCT:
      return [action.payload, ...state];

    default:
      return state;
  }
}
