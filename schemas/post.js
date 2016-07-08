var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema =  new Schema({ 
                         payload: String,
                         meta:{
                             date: Date,
                             user: { type: Schema.Types.ObjectId, ref: 'UserInfo' }

                         }
                     });
var postSchema = new Schema({ 
	                     payload: String,
                         comments: [ commentSchema ],
                         meta: {
                             date: Date,
                             user: { type: Schema.Types.ObjectId, ref: 'UserInfo' }
                         }
                            
                    });
module.exports = mongoose.model('Post', postSchema);