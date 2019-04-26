import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

const users = ['hari', 'krish', 'shiv'];
const numbers = [10, 20, 30];

const stream = Observable.from(users)
  .map(i => `main - ${i}`)
  .concat(Observable.from(numbers).map(n => `sub - ${n}`));

// const stream = Observable.interval(1000)
//   .map(i => `main - ${i + 1000}`)
//   .merge(Observable.interval(200).map(n => `sub - ${n}`))
//   .take(25);

// const o1 = Observable.interval(1000).map(i => `o1 - ${i + 1000}`);
// const o2 = Observable.interval(200).map(n => `o2 - ${n}`);

// const stream = Observable.merge(o1, o2).take(25);

stream.subscribe(
  data => console.log('data:', data),
  err => console.log('error:', err),
  () => console.log('completed!')
);
