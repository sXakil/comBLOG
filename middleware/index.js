let db = require("../models");

module.exports = mwObject = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in!");
        res.redirect("/login");
    },
    isAuthorizedBlog: function(req, res, next) {
        if(req.isAuthenticated()) {
            db.Blog.findById(req.params.id, (err, blog) => {
                if(err) {
                    console.log(err);
                } else {
                    if(blog.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("warning", "Permission denied!");
                        res.back();
                    }
                }
            })
        } else {
            req.flash("error", "You need to be logged in!");
            res.redirect("/login");
        }
    },
    isAuthorizedComment: function(req, res, next) {
        if(req.isAuthenticated()) {
            db.Comment.findById(req.params.comId, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    if(comment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("warning", "Permission denied!");
                        res.back();
                    }
                }
            })
        } else {
            req.flash("error", "You need to be logged in!");
            res.redirect("/login");
        }
    },
    isAlreadyLoggedIn: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        req.flash("warning", "You are already logged in!");
        res.back();
    }
};