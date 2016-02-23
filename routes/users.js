var express = require('express');
var user = require('../schemas/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
      res.send(req.session.name);

});

module.exports = router;
