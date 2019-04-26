import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

const numbers = [1, 2, 3, 4, 5];

const stream = Observable.from(numbers);

stream.subscribe(
  n => console.log(n),
  err => console.log('error:', err),
  () => console.log('completed!')
);
