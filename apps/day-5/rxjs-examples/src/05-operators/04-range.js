import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';

const o = Observable.range(21, 5);

o.subscribe(
  v => console.log(v),
  err => console.log('error:', err),
  () => console.log('completed!')
);
