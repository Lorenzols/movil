const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, require: true, minLength: 3},
    email: {type: String, require: true, trim: true},
    password: {type: String, require: true, minLength: 8}
})

module.exports = mongoose.model('User', userSchema)