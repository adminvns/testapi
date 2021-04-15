var express = require('express');
var app = express();

const prodRoute = require('./api/routes/products')
const prodOrder = require('./api/routes/orders')

app.use('/products', prodRoute);
app.use('/orders',prodOrder);
app.use('/', (req, res , next)=>{

res.status(200).json({
    message: "default page!"
});

});


module.exports= app;
