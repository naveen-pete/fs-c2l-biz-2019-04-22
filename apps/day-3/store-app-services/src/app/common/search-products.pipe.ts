import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product';

@Pipe({
  name: 'searchProducts',
  pure: true
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
    if (searchText.length <= 0)
      return products;

    return products.filter(product => product.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
  }

}
