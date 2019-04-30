const express = require('express');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const utils = require('../utils');
const db = require('../db');

const router = express.Router();

const users = db.users;

const validateRegister = user => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  let { error } = Joi.validate(user, schema);
  if (error) {
    error = utils.createAppError(error.details[0].message);
  }

  return error;
}

const validateLogin = credentials => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  let { error } = Joi.validate(credentials, schema);
  if (error) {
    error = utils.createAppError(error.details[0].message);
  }

  return error;
}

router.get('/users', (req, res) => {
  res.send(users);
});

router.post('/register', (req, res) => {
  const error = validateRegister(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  const { name, email, password } = req.body;
  let user = users.find(u => u.email === email);
  if (user) {
    return res.status(400).json(utils.createAppError(`User with email ${email} already registered.`));
  }

  bcrypt.hash(password, 10)
    .then((hash) => {
      user = {
        id: utils.generateId(users),
        name,
        email,
        password: hash
      };
      users.push(user);

      res.status(201).send(_.pick(user, ['id', 'name', 'email']));
    });
});

router.post('/login', async (req, res) => {
  const error = validateLogin(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  const { email, password } = req.body;
  let user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json(utils.createAppError(`Login failed.`));
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(400).json(utils.createAppError(`Login failed.`));
  }

  const payload = { id: user.id, name: user.name };
  const token = jwt.sign(payload, utils.jwtSecretKey, { expiresIn: (15 * 60) });

  const response = {
    token,
    user: _.pick(user, ['id', 'name'])
  }
  res.send(response);
});

module.exports = router;