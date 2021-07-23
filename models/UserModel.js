const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String

})

module.exports = User = mongoose.model('User', UserSchema);
