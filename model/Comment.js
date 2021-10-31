const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    comment: {
        type: String,
    },
    like: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }
    ],
    ownerID: 
        { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }
    ,
    ownername:String,
    date:Date,

});
module.exports = mongoose.model('Comment', Comment)