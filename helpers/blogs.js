let db         = require("../models");

exports.indexAllBlog = (req, res) => {
    db.Blog.find({}, (err, blogs) => {
        if(err) res.send(err);
        else {
            req.session.returnTo = '/';
            res.render("blogs/index",{blogs : blogs, pretty: true});
        }
    })
};

exports.showSelectedBlog = (req, res) => {
    db.Blog.findById(req.params.id)
    .populate("comments")
    .populate("credit")
    .exec((err, blog) => {
        if(err) res.send(err)
        else if(!blog) res.send(blog)
        else {
            req.session.returnTo = '/blogs/' + blog._id;
            // db.Profile.findById(blog.author.username, (err, author) => {
            // })
            res.render("blogs/show", {blog : blog, pretty: true})
        }
    })
};

exports.postNewBlog = (req, res) => {
    db.Profile.findOne({username: req.user.username}, (err, profile) => {
        if(err) res.send(err)
        else {
            req.body.body = req.sanitize(req.body.body)
            let newBlog = {
                title: req.body.title, 
                image: req.body.image, 
                blog: req.body.body,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
                credit: profile._id
            };
            db.Blog.create(newBlog, (err, blog) => {
                if(err){
                    res.send(err)
                } else {
                    res.redirect("/blogs/" + blog._id)
                }
            })
        }
    })
};

exports.updateSelectedBlog = (req, res) => {
    req.body.blog.blog = req.sanitize(req.body.blog.blog)
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
