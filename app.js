var express = require('express');
var app = express();

const prodRoute = require('./api/routes/products')


app.use('/products', prodRoute)
app.use('/', (req, res , next)=>{

res.status(200).json({
    message: "default page!"
});

});
// app.use((req, res, next)=> {
//     res.status(200).json({
//         message: "It works!"
//     });
    

// });

module.exports= app;
