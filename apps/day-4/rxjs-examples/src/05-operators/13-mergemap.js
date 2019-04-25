import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromevent';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/map';

const txtFirstName = $('#firstName');
const txtLastName = $('#lastName');
const output = $('#fullName');

const fnStream = Observable.fromEvent(txtFirstName, 'input');
const lnStream = Observable.fromEvent(txtLastName, 'input');

// fnStream.subscribe(event => output.text(event.target.value));
// lnStream.subscribe(event => output.text(event.target.value));

fnStream
  .mergeMap(fnEvent => {
    return lnStream.map(
      lnEvent => fnEvent.target.value + ' ' + lnEvent.target.value
    );
  })
  .subscribe(fullName => output.text(fullName));
