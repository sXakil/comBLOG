let db = require("../models");

module.exports = mwObject = {

    /* checks if the user is logged in */
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in!");
        res.redirect("/login");
    },

    /* checks if the user is authorize to make changes to a particular blog */
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

    /* checks if the user is authorize to make changes to a particular comment */
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

    /* checks if a user is already logged in */
    isAlreadyLoggedIn: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        req.flash("warning", "You are already logged in!");
        res.back();
    }
};
