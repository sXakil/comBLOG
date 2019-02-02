/* mongoose config */
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_v1", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

module.exports = {
    Blog : require("./blog"),
    Comment : require("./comment"),
    User : require("./user")
}
