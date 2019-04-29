const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./middleware/logger');
const home = require('./routes/home');
const products = require('./routes/products');
const auth = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

if (app.get('env') === 'development') {
  app.use(logger);
  app.use(morgan('tiny'));
}

// app.use(authMiddleware);

app.use('/', home);
app.use('/api/products', products);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
