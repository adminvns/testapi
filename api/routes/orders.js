const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// GET all orders - requires 'user' or 'admin' role
router.get('/', authorize('user', 'admin'), (req, res) => {

  res.status(200).json({

    message: 'Order was fetched',
    user: req.user.username
  });

});

// POST order - requires 'user' or 'admin' role
router.post('/', authorize('user', 'admin'), (req, res) => {

  res.status(201).json({

    message: 'Order was created'
  });

});

// GET order by ID - requires 'user' or 'admin' role
router.get('/:orderID', authorize('user', 'admin'), (req, res) => {

  res.status(200).json({
    message: 'order details',
    id: req.params.orderID
  });

});

// DELETE order - requires 'admin' role only
router.delete('/:orderID', authorize('admin'), (req, res) => {

  res.status(200).json({
    message: 'order deleted',
    id: req.params.orderID
  });

});


module.exports = router;
