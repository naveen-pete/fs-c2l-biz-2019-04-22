import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

const o = Observable.interval(1000).take(5);

o.subscribe(
  v => console.log(v),
  err => console.log('error:', err),
  () => console.log('completed!')
);
