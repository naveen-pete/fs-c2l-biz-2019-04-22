import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromevent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchmap';

const btn = $('#sm');
const btnEventStream = Observable.fromEvent(btn, 'click');
const intervalStream = Observable.interval(1000);

// let btnEventCount = 0;

// btnEventStream.subscribe(event => {
//   ++btnEventCount;
//   intervalStream.subscribe(v => {
//     console.log(`btnEventCount: ${btnEventCount}, v: ${v}`);
//   });
// });

btnEventStream
  .switchMap(event => {
    return intervalStream;
  })
  .subscribe(v => {
    console.log(`v: ${v}`);
  });
