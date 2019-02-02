let db = require("../models");

exports.getAllBlog = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.find({}, (err, blogs) => {
        if(err) res.send(err)
        else res.json(blogs);
    })
}

exports.getSelectedBlog = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.findById(req.params.id).populate("comments").exec((err, blog) => {
        if(err) res.send(err)
        else res.json(blog);
    })
}
