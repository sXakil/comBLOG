var express  = require("express");
var router   = express.Router();
var passport = require("passport");
let db       = require("../models");
//let flash    = require("connect-flash");
let middleware = require("../middleware");

//root route
router.get("/", function(req, res){
    res.redirect("/blogs")
});

// show register form
router.get("/register", middleware.isAlreadyLoggedIn, function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new db.User({
        username: req.body.username,
        firstName: req.body.firstName,
        surName: req.body.surName
    });
    db.User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/blogs");
        });
    });
});
//show login form
router.get("/login", middleware.isAlreadyLoggedIn, function(req, res){
    res.render("login", {error: req.flash('error')});
});

//handling login logic
router.post("/login", passport.authenticate("local", {
        successReturnToOrRedirect: "/blogs",
        failureRedirect: "/login"
}));

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
});

module.exports = router;