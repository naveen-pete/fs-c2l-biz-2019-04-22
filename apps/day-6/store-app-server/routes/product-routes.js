const express = require('express');

const router = express.Router();

let products = [
  { id: 1, name: 'iPhone X', description: 'From Apple', price: 50000, isAvailable: true },
  { id: 2, name: 'Samsung Galaxy', description: 'From Samsung', price: 30000, isAvailable: false }
];

const generateId = () => {
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  return id;
};

router.get('/', (req, res) => {
  res.send(products);
});

router.post('/', (req, res) => {
  const product = {
    id: generateId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
  }
  products.push(product);
  res.status(201).send(product);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    res.status(404).send({ message: `Product for id ${id} is not found.` });
    return;
  }

  res.send(product);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    res.status(404).send({ message: `Product for id ${id} is not found.` });
    return;
  }

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.isAvailable = req.body.isAvailable;

  res.send(product);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    res.status(404).send({ message: `Product for id ${id} is not found.` });
    return;
  }

  products = products.filter(p => p.id !== id);

  res.send();
});

module.exports = router;
