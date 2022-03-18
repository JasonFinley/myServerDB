var express = require('express');
var router = express.Router();

var cors = require('cors');
const factoryController = require('../controllers/factory_controller');


var myController = new factoryController();

//  http://localhost:3000/factory/
router.get('/', cors(), myController.getFactoryDBController );
router.post('/', cors(), myController.postFactoryController );

//  http://localhost:3000/factory
router.delete('/:id', cors(), function(req, res, next) {
    const id = req.params.id;
    myController.delFactoryController( id , res, next );
});

module.exports = router;
