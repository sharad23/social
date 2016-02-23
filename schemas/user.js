var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var userSchema = new Schema({ 
	                          username: String,
	                          password: String,
	                         
	                      });

userSchema.pre('save', function(next) {
    
    var user = this;
    bcrypt.genSalt(4, function(err, salt) {
    	if(err) return console.error(err);
        bcrypt.hash(user.password, salt, function(err,hash) {
		            if(err) return console.error(err);
		            user.password = hash;
		            next();
		});
            
    });
    
    
});

userSchema.methods.comparePassword = function (password) {
     var user = this;
     var hash = user.password;
     /*bcrypt.compare(password, hash, function(err,res) {
             
             cb(err,res);
     });*/
     return bcrypt.compareSync(password, hash); 

};

module.exports = mongoose.model('User', userSchema);