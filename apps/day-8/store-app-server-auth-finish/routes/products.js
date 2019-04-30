const express = require('express');
const Joi = require('@hapi/joi');

const utils = require('../utils');
const auth = require('../middleware/auth');
const db = require('../db');

const router = express.Router();

let products = db.products;

const validate = product => {
  const schema = Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    isAvailable: Joi.boolean().required(),
    createdUserId: Joi.number().required(),
    createdUserName: Joi.string().optional()
  });

  let { error } = Joi.validate(product, schema);
  if (error) {
    error = utils.createAppError(error.details[0].message);
  }

  return error;
}

const validateId = id => {
  let { error } = Joi.validate(id, Joi.number().integer().positive());
  if (error) {
    error = utils.createAppError(`Invalid product id: ${id}`);
  }

  return error;
};

router.route('/')
  .get((req, res) => {
    res.send(products);
  })
  .post(auth, (req, res) => {
    const error = validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const createdUserId = parseInt(req.body.createdUserId);
    if (createdUserId !== req.user.id) {
      return res.status(400).send(utils.createAppError('Not authorized to create product.'));
    }

    const user = db.users.find(u => u.id === createdUserId);

    const product = {
      id: utils.generateId(products),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      isAvailable: req.body.isAvailable,
      createdUserId: req.body.createdUserId,
      createdUserName: user.name
    }
    products.push(product);

    res.status(201).send(product);
  });

router.route('/:id')
  .get((req, res) => {
    const error = validateId(req.params.id);
    if (error) {
      return res.status(400).send(error);
    }

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send(utils.createAppError(`Product for id ${id} is not found.`));
    }

    res.send(product);
  })
  .patch(auth, (req, res) => {
    let error = validateId(req.params.id);
    if (error) {
      return res.status(400).send(error);
    }

    error = validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send(utils.createAppError(`Product for id ${id} is not found.`));
    }

    if (product.createdUserId !== req.user.id) {
      return res.status(400).send(utils.createAppError('Not authorized to update product.'));
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.isAvailable = req.body.isAvailable;

    res.send(product);
  })
  .delete(auth, (req, res) => {
    const error = validateId(req.params.id);
    if (error) {
      return res.status(400).send(error);
    }

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send(utils.createAppError(`Product for id ${id} is not found.`));
    }

    if (product.createdUserId !== req.user.id) {
      return res.status(400).send(utils.createAppError('Not authorized to delete product.'));
    }

    db.products = products.filter(p => p.id !== id);
    products = db.products;

    res.send();
  });

module.exports = router;
