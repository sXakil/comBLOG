const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

/* user schema */
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be 4-20 characters long']
    },
    password: {
        type: String
    }
});
mongoose.plugin(passportLocalMongoose); //handles users and password hashing
module.exports = mongoose.model("User", userSchema);
