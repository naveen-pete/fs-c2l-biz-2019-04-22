import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

const o = Observable.timer(3000, 500).take(5);

o.subscribe(
  v => console.log(v),
  err => console.log('error:', err),
  () => console.log('completed!')
);
