var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userInfoSchema = new Schema({ 
	                    
                        personnel_info:{
                           
                            full_name: String,
                            dob: Date,
                            hobbies:[ String ]
                        },
                        login_info:{
                            login_id: { type: Schema.Types.ObjectId, ref: 'User' }
                        },
                        freinds:[{ type: Schema.Types.ObjectId, ref: 'UserInfo'}]

                    });
module.exports = mongoose.model('UserInfo', userInfoSchema);