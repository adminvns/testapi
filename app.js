//Note: any update in this file should also be reflected in test file.
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoute = require('./api/routes/auth');
const prodRoute = require('./api/routes/products');
const prodOrder = require('./api/routes/orders');
const healthRoute = require('./api/routes/healthCheck');
const visitorsRoute = require('./api/routes/visitors');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public routes (no authentication required)
app.use('/auth', authRoute);
app.use('/health', healthRoute);

// Protected routes (authentication required - applied in route files)
app.use('/products', prodRoute);
app.use('/orders', prodOrder);
app.use('/visitors', visitorsRoute);

//error handling
app.use((req, res, next) => {

  const err = new Error('This page does not exist, Navigate to /products or /orders or /visitors or /health or /auth');
  err.status = 404;
  next(err);


});
app.use((err, req, res, next) => {

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    },
  });
});


module.exports = app;