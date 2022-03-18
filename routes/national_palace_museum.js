var express = require('express');
var router = express.Router();
var cors = require('cors');
const MuseumController = require('../controllers/national_palace_museum_controller');

//   '/'
//   '/api/'

var myMuseumController = new MuseumController();

//  http://localhost:3000/national_palace_museum/
router.get('/', cors(), myMuseumController.getNationalMuseumController );
router.get('/:id', cors(), function( req, res, next ){
    const id = req.params.id;
    myMuseumController.getNationalMuseumInfoController( id , res, next );
});


module.exports = router;
