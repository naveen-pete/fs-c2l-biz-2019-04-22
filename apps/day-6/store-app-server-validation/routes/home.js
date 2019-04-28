const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Store App REST API');
});

module.exports = router;
