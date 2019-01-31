let express  = require("express");
let router   = express.Router();
let db       = require("../models");
let mwObject = require("../middleware");

router.get("/", (req, res) => {
    db.Blog.find({}, (err, blogs) => {
        if(err){
            res.send(err);
        } else {
            res.render("index",{blogs : blogs, pretty: true});
        }
    });
});

router.post("/", mwObject.isLoggedIn, (req, res) => {
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

router.get("/new", mwObject.isLoggedIn, (req, res) => {
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

router.get("/:id/edit", mwObject.isAuthorized, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        res.render("edit", {blog: blog});
    })
});

router.put("/:id", mwObject.isAuthorized, (req, res) => {
    db.Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/blogs/" + updatedBlog._id)
        }
    })
})

router.delete("/:id", mwObject.isAuthorized, (req, res) => {
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