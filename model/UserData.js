const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    prifileimage: String,
    bio: String,
    birthdate: String,
    gender: String,

})
module.exports = mongoose.model('UserSchema', UserSchema)
