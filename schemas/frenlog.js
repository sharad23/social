var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var frenLogSchema = new Schema({ 
	                    from_user: { type: Schema.Types.ObjectId, ref: 'User' },
                        to_user: { type: Schema.Types.ObjectId, ref: 'User' },
                        response: {
                           result: Boolean,
                           date: Date
                        }


                    });
module.exports = mongoose.model('frenLog', frenLogSchema);