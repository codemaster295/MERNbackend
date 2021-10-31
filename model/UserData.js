const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    profileimage: String,
    bio: String,
    birthdate: String,
    gender: String,

})
module.exports = mongoose.model('UserSchema', UserSchema)
