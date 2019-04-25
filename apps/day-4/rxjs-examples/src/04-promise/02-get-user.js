import $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

const name = $('#name');
const contact = $('#contact');
const address = $('#address');

const getUser = id => {
  return $.get(`https://jsonplaceholder.typicode.com/users/${id}`).promise();
};

const promise = getUser(2);

const stream = Observable.fromPromise(promise);
stream.subscribe(
  user => {
    console.log('user:', user);

    name.append(user.name);
    contact.append(`
      <li>Phone: ${user.phone}</li>
      <li>Email: ${user.email}</li>
    `);
    address.append(`
      <li>${user.address.suite}, ${user.address.street}</li>
      <li>${user.address.city} - ${user.address.zipcode}</li>
    `);
  },
  err => console.log('error:', err),
  () => console.log('completed!')
);
