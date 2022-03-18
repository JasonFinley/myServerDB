var express = require('express');
var router = express.Router();


//   '/'
//   '/api/'
const data = [
    {
       id : 1,
       value : "my api test 1",
    },
];

//  http://localhost:3000/api/products
router.get('/products', function(req, res, next) {
    res.status(200);
    res.send({
        success : true,
        data,
    });
    res.end();
});

router.post('/products', function(req, res, next) {

    const product = req.body;
    data.push({
        ...product,
        id : new Date().getTime(),
    });
    console.log( data );

    res.status(200);
    res.send({
        success : true,
        data,
    });
    res.end();
});


//  http://localhost:3000/api/products
router.delete('/products/:id', function(req, res, next) {
    const id = req.params.id;

    data.forEach( ( item, idx ) =>{
        if( item.id == id ){
            data.splice( idx, 1 );
        }
    } );

    console.log( data );

    res.status(200);
    res.send({
        success : true,
        data,
    });
    res.end();
});

module.exports = router;
