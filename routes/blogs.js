let express  = require("express");
let router   = express.Router();
let db       = require("../models");
let middleware = require("../middleware");

router.get("/", (req, res) => {
    db.Blog.find({}, (err, blogs) => {
        if(err){
            res.send(err);
        } else {
            res.render("index",{blogs : blogs, pretty: true});
        }
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    let newBlog = {
        title: req.body.title, 
        image: req.body.image, 
        blog: req.body.body,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    db.Blog.create(newBlog, (err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("new", {pretty: true});
});

router.get("/:id", (req, res) => {
    db.Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, blog) => {
        if(err){
            res.send(err)
        } else {
            res.render("show", {blog : blog, pretty: true})
        }
    })
});

router.get("/:id/edit", middleware.isAuthorized, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        res.render("edit", {blog: blog});
    })
});

router.put("/:id", middleware.isAuthorized, (req, res) => {
    db.Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/blogs/" + updatedBlog._id)
        }
    })
})

router.delete("/:id", middleware.isAuthorized, (req, res) => {
    db.Blog.findByIdAndRemove(req.params.id, (err, blog) => {
        if(err) {
            res.send(err);
        } else {
            blog.comments.forEach((comment) => {
                db.Comment.findByIdAndRemove(comment._id, (err) => {
                    if(err) {
                        res.send(err);
                    }
                })
            })
            res.redirect("/blogs");
        }
    })
})

module.exports = router;