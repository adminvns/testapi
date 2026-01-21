const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// GET all products - requires 'user' or 'admin' role
router.get('/', authorize('user', 'admin'), (req, res) => {

  res.status(200).json({

    message: 'Products(GET method)',
    user: req.user.username
  });

});

// POST product - requires 'admin' role only
router.post('/', authorize('admin'), (req, res) => {

  res.status(201).json({

    message: 'Products(POST method)'
  });
});

// GET product by ID - requires 'user' or 'admin' role
router.get('/:productID', authorize('user', 'admin'), (req, res) => {

  const id = req.params.productID;
  if (id == 123) {

    res.status(200).json({
      message: 'Congratulations on winning it',
      id: id
    });

  } else {

    res.status(200).json({

      message: 'This is random id'
    });
  }

});

// PATCH product - requires 'admin' role only
router.patch('/:productID', authorize('admin'), (req, res) => {
  res.status(200).json({

    message: ' Product updated successfully!'
  });
});

// DELETE product - requires 'admin' role only
router.delete('/:productID', authorize('admin'), (req, res) => {
  res.status(200).json({

    message: ' Product deleted successfully.'
  });
});

module.exports = router;