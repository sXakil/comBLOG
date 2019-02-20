let db         = require("../models");

exports.postComment = (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) res.send(err)
        if(!blog) res.render("404")
        else {
            req.body.comment.text = req.sanitize(req.body.comment.text)
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
            })
        }
    })
}

exports.editCommentPage = (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) res.send(err)
        if(!blog) res.render("404")
        else {
            db.Comment.findById(req.params.comId, (err, comment) => {
                if(err) {
                    res.send(err);
                } else {
                    res.render("comments/edit", {blog : blog, comment : comment})
                }
            })
        }
    })
}

exports.updateComment = (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) res.send(err)
        else {
            req.body.text = req.sanitize(req.body.text)
            db.Comment.findByIdAndUpdate(req.params.comId, {text : req.body.text}, (err) => {
                if(err) {
                    res.send(err)
                } else {
                    req.flash("success", "Comment updated successfully");
                    res.redirect("/blogs/" + blog._id);
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
                    req.flash("success", "Comment deleted successfully");
                    res.redirect("/blogs/" + blog._id);
                }
            });
        }
    })
}
