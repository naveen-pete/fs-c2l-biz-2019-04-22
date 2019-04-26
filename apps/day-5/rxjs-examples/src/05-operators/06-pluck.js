import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/pluck';

const users = [
  { id: 1, name: 'hari', city: 'bengaluru' },
  { id: 2, name: 'krish', city: 'mumbai' },
  { id: 3, name: 'shiv', city: 'chennai' }
];

const stream = Observable.from(users).pluck('name');

stream.subscribe(
  user => console.log('user:', user),
  err => console.log('error:', err),
  () => console.log('completed!')
);
