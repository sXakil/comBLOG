let express = require("express");
let router   = express.Router();
let db       = require("../models");

router.post("/:id/comment", isLoggedIn, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.send(err);
        } else {
            db.Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.send(comment);
                }
            });
        }
    })
});

router.delete("/:id/comment/:comId", isAuthorized, isLoggedIn, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.send(err);
        } else {
            db.Comment.findByIdAndRemove(req.params.comId, (err, comment) => {
                if(err) {
                    res.send(err)
                } else {
                    blog.comments.pull(comment);
                    blog.save();
                    res.redirect("/blogs/" + blog._id);
                }
            });
        }
    })
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function isAuthorized(req, res, next) {
    if(req.isAuthenticated()) {
        db.Blog.findById(req.params.id, (err, blog) => {
            if(err) {
                console.log(err);
            } else {
                if(blog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.send("Permission denied!")
                }
            }
        })
    } else {
        res.send("Permission denied!")
    }
}

module.exports = router;