var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatRoomSchema = new Schema({ 
	                  
                         users:[{ type: Schema.Types.ObjectId, ref: 'UserInfo'}],
                         meta:{
                            date: Date,
                            founder: [{ type: Schema.Types.ObjectId, ref: 'UserInfo'}]
                        }

                    });
module.exports = mongoose.model('ChatRoom', chatRoomSchema);