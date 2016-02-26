var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social-with-fb');
module.exports = mongoose.connection;