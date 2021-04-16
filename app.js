var express = require('express');
var app = express();
const morgan = require('morgan')
const prodRoute = require('./api/routes/products')
const prodOrder = require('./api/routes/orders')
//rerouting requests

app.use(morgan('dev'));
app.use('/products', prodRoute);
app.use('/orders',prodOrder);
// app.use('/', (req, res , next)=>{

// res.status(200).json({
//     message: "default page!"
// });

// });


//error handling
app.use((req,res,next)=>{

    const err = new Error('Page Not Found');
    err.status = 404;    
    next(err);


})
app.use((err,req,res,next)=>{

    res.status(err.status || 500)
    res.json({
            error:{
                message: err.message
            },
    });
});


module.exports= app;
