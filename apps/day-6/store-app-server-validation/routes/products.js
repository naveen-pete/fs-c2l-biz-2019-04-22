const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

let products = [
  { id: 1, name: 'iPhone X', description: 'From Apple', price: 50000, isAvailable: true },
  { id: 2, name: 'Samsung Galaxy', description: 'From Samsung', price: 30000, isAvailable: false }
];

const generateId = items => {
  const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  return id;
};

const validate = product => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    isAvailable: Joi.boolean().required()
  });

  let { error } = Joi.validate(product, schema);
  if (error) {
    error = createAppError(error.details[0].message);
  }

  return error;
}

const validateId = id => {
  let { error } = Joi.validate(id, Joi.number().integer().positive());
  if (error) {
    error = createAppError(`Invalid product id: ${id}`);
  }

  return error;
};

const createAppError = message => ({ message });

router.route('/')
  .get((req, res) => {
    res.send(products);
  })
  .post((req, res) => {
    const error = validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const product = {
      id: generateId(products),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      isAvailable: req.body.isAvailable,
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
      return res.status(404).send(createAppError(`Product for id ${id} is not found.`));
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
      return res.status(404).send(createAppError(`Product for id ${id} is not found.`));
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
      return res.status(404).send(createAppError(`Product for id ${id} is not found.`));
    }

    products = products.filter(p => p.id !== id);

    res.send();
  });

module.exports = router;
