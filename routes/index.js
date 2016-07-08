var express = require('express');
var router = express.Router();
var Post = require('../schemas/post');

router.get('/', function(req, res, next) {
	  Post.find({})
	      .lean()
	      .exec(function(err,data){
                if(err) return console.log(err);
                res.render('index', { title: 'Express' , posts: data });
          });
      
});

router.get('/logout',function(req,res,next){

       req.session.destroy(function(err) {
		    // cannot access session here
		    if(err) return console.log(err)
		    res.redirect('/login');
	   });
});
module.exports = router;
