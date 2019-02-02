let db         = require("../models");

exports.postComment = (req, res) => {
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
}

exports.deleteComment = (req, res) => {
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
}