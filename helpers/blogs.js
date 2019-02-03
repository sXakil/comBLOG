let db         = require("../models");

exports.indexAllBlog = (req, res) => {
    db.Blog.find({}, (err, blogs) => {
        if(err){
            res.send(err);
        } else {
            req.session.returnTo = '/';
            res.render("blogs/index",{blogs : blogs, warning: req.flash('warning'), pretty: true});
        }
    })
};

exports.showSelectedBlog = (req, res) => {
    db.Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, blog) => {
        if(err){
            res.redirect("/404");
        } else {
            req.session.returnTo = '/blogs/' + blog._id;
            res.render("blogs/show", {blog : blog, warning: req.flash('warning'), success: req.flash('success'), pretty: true})
        }
    })
};

exports.postNewBlog = (req, res) => {
    let newBlog = {
        title: req.body.title, 
        image: req.body.image, 
        blog: req.body.body,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    db.Blog.create(newBlog, (err, blog) => {
        if(err){
            res.send(err)
        } else {
            res.redirect("/blogs/" + blog._id)
        }
    })
};

exports.updateSelectedBlog = (req, res) => {
    db.Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.send(err)
        } else {
            res.redirect("/blogs/" + updatedBlog._id)
        }
    })
};

exports.deleteSelectedBlog = (req, res) => {
    db.Blog.findByIdAndRemove(req.params.id, (err, blog) => {
        if(err) {
            res.send(err)
        } else {
            blog.comments.forEach((comment) => {
                db.Comment.findByIdAndRemove(comment._id, (err) => {
                    if(err) {
                        res.send(err)
                    }
                })
            })
            res.redirect("/blogs")
        }
    })
};
