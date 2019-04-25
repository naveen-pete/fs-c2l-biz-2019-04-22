import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromevent';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

const txtCustName = $('#customerName');

const custNameStream = Observable.fromEvent(txtCustName, 'input')
  .map(event => event.target.value)
  .throttleTime(1000);
// .debounceTime(1000)
// .distinctUntilChanged();

custNameStream.subscribe(custName => console.log(custName));
