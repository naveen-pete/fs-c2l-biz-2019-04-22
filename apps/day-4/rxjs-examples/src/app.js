import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

const ctrl = $('#btn');

const stream = Observable.fromEvent(ctrl, 'click');
stream.subscribe(
  event => console.log('event:', event),
  err => console.log('error:', err),
  () => console.log('completed!')
);
