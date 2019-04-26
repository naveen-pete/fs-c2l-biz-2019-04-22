import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

const numbers = [10, 15, 20, 25, 30];

const numbers$ = Observable.from(numbers).map(n => n * 2);

numbers$.subscribe(
  n => console.log(n),
  err => console.log('error:', err),
  () => console.log('numbers completed!')
);

// const customers = ['hari', 'krish', 'shiv'];

// const customers$ = Observable.from(customers)
//   .map(c => c.toUpperCase())
//   .map(c => `Hello ${c}!`);

// customers$.subscribe(
//   c => console.log(c),
//   err => console.log('error:', err),
//   () => console.log('customers completed!')
// );
