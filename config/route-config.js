var express = require('express');
var router = express.Router();

var productRoutes  = require('../routes/product');

router.use('/', productRoutes);


module.exports = router