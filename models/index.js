var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
mongoose.Promise = Promise;

module.exports = {
    Campground : require("./campground"),
    Comment : require("./comment"),
    User : require("./user")
}
