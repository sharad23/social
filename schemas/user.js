var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var userSchema = new Schema({ 
	                          local:{ 
                                      username: String,
                                      password: String

                                    },
                               facebook: {

                                   
                                    token: String,
                                    email: String,
                                    name: String
                               }
                            
	                         
	                        });

userSchema.pre('save', function(next) {
    
    var user = this;
    bcrypt.genSalt(4, function(err, salt) {
    	if(err) return console.error(err);
        bcrypt.hash(user.local.password, salt, function(err,hash) {
		            if(err) return console.error(err);
		            user.local.password = hash;
		            next();
		});
            
    });
    
    
});

userSchema.methods.comparePassword = function (password,cb) {
     var user = this;
     var hash = user.local.password;
     bcrypt.compare(password, hash, function(err,res) {
             
             cb(err,res);
     });
     //return bcrypt.compareSync(password, hash); 

};

module.exports = mongoose.model('User', userSchema);