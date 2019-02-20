var express  = require("express");
var router   = express.Router();
var passport = require("passport");
let db       = require("../models");
let middleware = require("../middleware");

/* index page */
router.get("/", (req, res) => {
    res.redirect("/blogs")
});

/* registration form */
router.get("/register", middleware.isAlreadyLoggedIn, (req, res) => {
    res.render("auth/register", {pretty: true});
});

/* registration request */
router.post("/register", (req, res) => {
    var newUser = new db.User({
        username: req.body.username
    });
    var userProfile = {
        username: req.body.username,
        firstName: req.body.firstName,
        surName: req.body.surName,
        gender: req.body.gender,
        bday: req.body.bday,
        email: req.body.email,
        phone: req.body.phoneCC + req.body.phone,
        image: req.body.image
    }
    db.User.register(newUser, req.body.password, (err) => {
        if(err){
            if(err.errors) {
                let errs = [];
                for(let e in err.errors) {
                    errs.push(err.errors[e].message)
                }
                req.flash("error", errs)
            }
            else {
                req.flash("error", err.message)
            }
            res.redirect("/register");
        } else {
            db.Profile.create(userProfile, err => {
                if(err) res.send(err)
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/blogs");
                })
            })
        }
    })
});

/* login form */
router.get("/login", middleware.isAlreadyLoggedIn, function(req, res){
    res.render("auth/login", {pretty: true})
});

/* login request */
router.post("/login", passport.authenticate("local", {
        successReturnToOrRedirect: "/blogs",
        failureRedirect: "/login",
        failureFlash: true
}));

/* logout */
router.get("/logout", function(req, res){
    req.logout()
    req.flash("success", "Logged out successfully!")
    res.redirect("/blogs")
});

module.exports = router;
