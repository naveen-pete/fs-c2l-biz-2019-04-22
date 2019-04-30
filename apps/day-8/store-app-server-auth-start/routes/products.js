const express = require('express');
const Joi = require('@hapi/joi');

const utils = require('../utils');
const auth = require('../middleware/auth');

const router = express.Router();

let products = [];

const validate = product => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    isAvailable: Joi.boolean().required()
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

    const product = {
      id: utils.generateId(products),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      isAvailable: req.body.isAvailable,
      createdBy: req.user.id
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
  .patch((req, res) => {
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

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.isAvailable = req.body.isAvailable;

    res.send(product);
  })
  .delete((req, res) => {
    const error = validateId(req.params.id);
    if (error) {
      return res.status(400).send(error);
    }

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send(utils.createAppError(`Product for id ${id} is not found.`));
    }

    products = products.filter(p => p.id !== id);

    res.send();
  });

module.exports = router;
