import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

const products = [
  { id: 1, name: 'p11', desc: 'p11 desc', price: 11 },
  { id: 2, name: 'p22', desc: 'p22 desc', price: 22 },
  { id: 3, name: 'p33', desc: 'p33 desc', price: 33 }
];

const list = $('#products');

const stream = Observable.from(products);

stream.subscribe(
  product => {
    console.log(product);
    list.append(`
      <li>
        <h3>${product.name}</h3>
        <p>Description: ${product.desc}</p>
        <p>Price: ${product.price}</p>
      </li>
    `);
  },
  err => console.log('error:', err),
  () => console.log('completed!')
);
