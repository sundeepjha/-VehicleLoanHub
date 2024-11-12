const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;