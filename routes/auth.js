var express  = require("express");
var router   = express.Router();
var passport = require("passport");
let db       = require("../models");
let mwObject = require("../middleware");

//root route
router.get("/", function(req, res){
    res.redirect("/blogs")
});

// show register form
router.get("/register", mwObject.isAlreadyLoggedIn, function(req, res){
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
router.get("/login", mwObject.isAlreadyLoggedIn, function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
});

module.exports = router;