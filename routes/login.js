var express = require('express');
var router = express.Router();
var passports =  require('passport');

/* GET home page. */

module.exports = function(passport){

        router.get('/', function(req, res, next) {
      
		      res.render('login');
		});



        router.post('/',passports.authenticate('local', { 
        	                                             successRedirect: '/',
                                                         failureRedirect: '/login' 

                                                        }));

        
        /*router.get('/emulateLogin',function(req,res,nxt){
              
               req.session.test = 'ok';
               req.session.another = 'notok';
               res.send('Done');
        });

        router.get('/all',function(req,res,next){
               
               res.send(req.session);
        });
*/
        
        return router;

};
