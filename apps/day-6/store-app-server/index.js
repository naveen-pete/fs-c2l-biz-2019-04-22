const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./middleware/logger');
const productsRouter = require('./routes/product-routes');

const app = express();

console.log(process.env.NODE_ENV);
console.log(app.get('env'));


app.use(cors());
app.use(express.json());


if (app.get('env') === 'development') {
  app.use(logger);
  app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
  res.send('Store App REST API');
});

app.use('/api/products', productsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});