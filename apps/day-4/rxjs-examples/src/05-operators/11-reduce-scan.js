import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/scan';

const numbers = [10, 15, 20, 25, 30];

const stream = Observable.from(numbers).reduce((total, currentValue) => {
  return total + currentValue;
}, 0);

stream.subscribe(total => console.log('total:', total));
