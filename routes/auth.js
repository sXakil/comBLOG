var express  = require("express");
var router   = express.Router();
var passport = require("passport");
let db       = require("../models");
let middleware = require("../middleware");

router.get("/", function(req, res){
    res.redirect("/blogs")
});

router.get("/register", middleware.isAlreadyLoggedIn, function(req, res){
    res.render("register", {error: req.flash('error')});
});

router.post("/register", function(req, res){
    var newUser = new db.User({
        username: req.body.username,
        firstName: req.body.firstName,
        surName: req.body.surName
    });
    db.User.register(newUser, req.body.password, function(err, user){
        if(err){
            if(err.errors) {
                var errs = [];
                for(var e in err.errors) {
                    errs.push(err.errors[e].message)
                }
                req.flash("error", errs)
            }
            else {
                req.flash("error", err.message)
            }
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/blogs");
            });
        }
    });
});

router.get("/login", middleware.isAlreadyLoggedIn, function(req, res){
    res.render("login", {error: req.flash('error')});
});

router.post("/login", passport.authenticate("local", {
        successReturnToOrRedirect: "/blogs",
        failureRedirect: "/login",
        failureFlash: true
}));

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
});

module.exports = router;