import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const stream = new Observable(observer => {
  console.log('Creating observable..');

  observer.next('value 1');
  observer.next('value 2');

  observer.error('original error.');

  setTimeout(() => {
    observer.next('value 3 (async)');
    observer.complete();
  }, 3000);
});

stream
  .catch(err => {
    console.log('catch:', err);
    return Observable.throw('transformed error');
  })
  .subscribe(
    v => console.log('value:', v),
    err => console.log('error:', err),
    () => console.log('completed!')
  );
