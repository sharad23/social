var express = require('express');
var router = express.Router();
var passports =  require('passport');

/* GET home page. */

module.exports = function(passport){

        router.get('/', function(req, res, next) {
      
		         res.render('login');
	     	});


        //it works both with passport and passports
        router.post('/',passport.authenticate('local', { 
        	                                                successRedirect: '/',
                                                            failureRedirect: '/login' 

                                                        }
        ));
      
        router.get('/facebook',passport.authenticate('facebook', { scope : 'email' }));
        return router;

};
