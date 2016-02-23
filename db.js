var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social');
module.exports = mongoose.connection;