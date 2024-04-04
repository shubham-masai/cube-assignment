const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    title:String,
    address:String
}, {
    versionKey: false
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;