var express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{

res.status(200).json({

    message: "Products(get method)"
});

} );

router.post('/',(req, res, next) =>{

    res.status(200).json({
    
        message: "Products(post method)"
    });
    
    } );


module.exports = router;