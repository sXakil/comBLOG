let express  = require("express");
let router   = express.Router();
let db       = require("../models");

/* all blog preview */
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.find({}, (err, blogs) => {
        if(err) res.send(err)
        else res.json(blogs);
    })
})

/* singular blog lookup */
router.get('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.Blog.findById(req.params.id).populate("comments").exec((err, blog) => {
        if(err) res.send(err)
        else res.json(blog);
    })
})

module.exports = router;