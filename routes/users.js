var express = require('express');
var user = require('../schemas/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
      res.send(req.session);

});
router.get('/add', function(req, res, next){

	  var newUser = new user();
	  newUser.local.username = 'sharad';
	  newUser.local.password = 'sharad';
	  newUser.save(function(err,result){
            if(err) return console.log(err);
            res.send(result);
	  });
})

module.exports = router;
