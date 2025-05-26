const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Health check passed Successfully!',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
