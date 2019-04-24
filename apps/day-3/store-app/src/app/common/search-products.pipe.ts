import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    });
    return filteredProducts;
  }

}
