var User = require('./schemas/user');
var FacebookStrategy =  require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
module.exports =  function(passport){
        
        //local Statergy
        passport.use(new LocalStrategy({
			    usernameField: 'email',
			    passwordField: 'password'
			  },
			  function(username, password, done) {
			        User.findOne({ 'local.username': username }, function (err, user) {
				      if (err) { return done(err,false); }
				      if (!user) {  return done(null, false); }
		              user.comparePassword(password,function(err,res){
                            if(err) return console.log(err);
                            if(res == true) {  return done(null,user); }
                            else if(res == false) {  return done(null,false); }
				      });
				    });
			  }
	    ));

        //facebook statergy
        passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
	        clientID        :  '994229483982055',     //configAuth.facebookAuth.clientID,
	        clientSecret    :  '7ca28aa175e2c31e23cfab82af05ce11',     //configAuth.facebookAuth.clientSecret,
	        callbackURL     :   'http://localhost:3000'     //configAuth.facebookAuth.callbackURL
            },

		    // facebook will send back the token and profile
		    function(token, refreshToken, profile, done) {

		        // asynchronous
		        process.nextTick(function() {

		            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                        if(err)  return done(err);

		                // if the user is found, then log them in
		                if (user) {
		                    return done(null, user); // user found, return that user
		                } else {
		                    // if there is no user found with that facebook id, create them
		                    var newUser  = new User();

		                    // set all of the facebook information in our user model
		                    newUser.facebook.id    = profile.id; // set the users facebook id                   
		                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
		                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
		                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

		                    // save our user to the database
		                    newUser.save(function(err) {
		                        if (err)
		                            throw err;

		                        // if successful, return the new user
		                        return done(null, newUser);
		                    });
		                }

		            });
		        });

		    }

		));

        


	    passport.serializeUser(function(user, done) {
		       done(null, user._id);
		});

		passport.deserializeUser(function(_id, done) {
		  User.findById(_id, function (err, user) {
		       done(err, user);
		  });
		});

		return passport;
};