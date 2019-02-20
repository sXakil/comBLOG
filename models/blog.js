const mongoose = require("mongoose");

/* blog schema */
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    blog: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    credit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Blog", blogSchema);