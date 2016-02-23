var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});

router.get('/logout',function(req,res,next){

       req.session.destroy(function(err) {
		    // cannot access session here
		    if(err) return console.log(err)
		    res.redirect('/login');
	   });
});
module.exports = router;
