const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    comment: {
        type: String,
    },
    like: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }
    ],
    ownerID:String,
    ownername:String,

});
module.exports = mongoose.model('Comment', Comment)