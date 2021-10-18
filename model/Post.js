const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({

    username: String,
    title: String,
    description: String,
    userImage: String,
    like: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }
     ],
    message: String,
    date:Date
})

module.exports = mongoose.model('Posts', PostSchema)
