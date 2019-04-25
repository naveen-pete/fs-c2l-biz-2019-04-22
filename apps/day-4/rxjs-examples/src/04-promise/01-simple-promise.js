import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

const promise = new Promise((resolve, reject) => {
  console.log('creating promise..');

  setTimeout(() => {
    const customer = { id: 1, name: 'hari' };
    resolve(customer);
  }, 3000);
});

const stream = Observable.fromPromise(promise);
stream.subscribe(
  data => console.log('data:', data),
  err => console.log('error:', err),
  () => console.log('completed!')
);
