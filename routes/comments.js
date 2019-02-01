let express    = require("express");
let router     = express.Router();
let db         = require("../models");
let middleware = require("../middleware");

router.post("/:id/comment", middleware.isLoggedIn, (req, res) => {
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

router.delete("/:id/comment/:comId", middleware.isAuthorizedComment, (req, res) => {
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

module.exports = router;