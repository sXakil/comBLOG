let db = require("../models");

exports.getAllBlog = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.find({}, (err, blogs) => {
        if(err) res.send(err)
        if(!blogs) res.render("404")
        else {
            let data = [];
            blogs.forEach(blog => {
                data.push({
                    id: blog._id,
                    author: blog.author.username,
                    comments: blog.comments.length,
                    title : blog.title,
                    image: blog.image,
                    blog_preview: blog.blog.slice(0, blog.blog.indexOf('\r')),
                    created: blog.created
                })
            })
            res.json(data)
        }
    })
}

exports.getSelectedBlog = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.findById(req.params.id).populate("comments").exec((err, blog) => {
        if(err) res.send(err)
        if(!blog) res.render("404")
        else res.json(blog)
    })
}
