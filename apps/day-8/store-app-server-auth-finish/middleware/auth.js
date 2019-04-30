const jwt = require('jsonwebtoken');

const utils = require('../utils');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(400).send(utils.createAppError('Token not found.'));
  }

  try {
    const payload = jwt.verify(token, utils.jwtSecretKey);
    req.user = payload;

    next();
  } catch (e) {
    console.log('Auth Middleware Error:', e);
    return res.status(401).send(utils.createAppError('Not authorized.'));
  }
};

module.exports = auth;
