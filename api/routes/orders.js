const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  res.status(200).json({

    message: 'Order was fetched'
  });

});

router.post('/', (req, res) => {

  res.status(201).json({

    message: 'Order was created'
  });

});


router.get('/:orderID', (req, res) => {

  res.status(200).json({
    message: 'order details',
    id: req.params.orderID
  });

});

router.delete('/:orderID', (req, res) => {

  res.status(200).json({
    message: 'order deleted',
    id: req.params.orderID
  });

});


module.exports = router;
