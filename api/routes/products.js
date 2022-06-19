const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{

res.status(200).json({

    message: "Products(GET method)"
});

} );

router.post('/',(req, res, next) =>{

    res.status(201).json({
    
        message: "Products(POST method)"
    });
    } );



 router.get('/:productID',(req, res, next)=> {

    const id = req.params.productID;
    if(id==123){

        res.status(200).json({
            message: "Congratulations on winning it",
            id: id
        });
    
    }else{

        res.status(200).json({

            message: "This is random id" 
        });
    }

 });   


 router.patch('/:productID',(req, res, next)=> {
        res.status(200).json({

            message :" Product updated successfully!"
        })
 }); 

 
 router.delete('/:productID',(req, res, next)=> {
    res.status(200).json({

        message :" Product deleted successfully."
    })
}); 

module.exports = router;