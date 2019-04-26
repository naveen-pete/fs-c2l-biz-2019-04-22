import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

const ctrl = $('#txt');
const output = $('#output');

const stream = Observable.fromEvent(ctrl, 'keyup');
stream.subscribe(event => {
  console.log('event:', event.target.value);
  output.text(event.target.value);
});
