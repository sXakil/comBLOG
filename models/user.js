const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    surName: String
});
mongoose.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);