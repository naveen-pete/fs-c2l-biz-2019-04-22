import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

const getUser = id => {
  return $.get(`https://jsonplaceholder.typicode.com/users/${id}`).promise();
};

const promise = getUser(1);

const stream = Observable.fromPromise(promise).map(user => {
  const newUser = {
    name: user.name,
    phone: user.phone,
    company: user.company.name,
    city: user.address.city
  };

  return newUser;
});

stream.subscribe(
  user => console.log('user:', user),
  err => console.log('error:', err),
  () => console.log('completed!')
);
