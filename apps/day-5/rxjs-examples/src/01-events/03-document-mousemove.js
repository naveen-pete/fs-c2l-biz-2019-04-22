import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

const output = $('#output');

const stream = Observable.fromEvent(document, 'mousemove');
stream.subscribe(event => {
  output.text(`X: ${event.clientX}, Y: ${event.clientY}`);
});
