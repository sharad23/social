var User = require('./schemas/user');
module.exports =  function(passport,LocalStrategy){
        passport.use(new LocalStrategy(
			  function(username, password, done) {
			        User.findOne({ username: username }, function (err, user) {
				      if (err) { return done(err,false); }
				      if (!user) { return done(null, false); }
				      if (!user.comparePassword(password)) { return done(null, false);  }
				      return done(null,user); 
				      
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