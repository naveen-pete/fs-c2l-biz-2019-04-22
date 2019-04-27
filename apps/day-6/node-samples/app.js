const _ = require('underscore');

const logger = require('./logger');

logger.log('Hello Node');
console.log(logger.name);

_.each([1, 2, 3], (n) => {
  console.log(n);
});

console.log('after nodemon setup');