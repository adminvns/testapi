var express = require('express');
var app = express();
const morgan = require('morgan')
const prodRoute = require('./api/routes/products')
const prodOrder = require('./api/routes/orders')
const healthRoute = require('./api/routes/healthCheck');
const visitorsRoute = require('./api/routes/visitors');
//rerouting requests

app.use(morgan('dev'));
app.use('/products', prodRoute);
app.use('/orders',prodOrder);
app.use('/health', healthRoute);
app.use('/visitors', visitorsRoute);

//error handling
app.use((req,res,next)=>{

    const err = new Error('This page does not exist, Navigate to /products or /orders or /visitors or /health');
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
