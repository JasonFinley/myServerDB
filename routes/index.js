var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index_controller');

indexController = new IndexController();
/* GET home page. */
router.get('/', indexController.controllerHelloWorld );

module.exports = router;
