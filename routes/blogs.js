let express  = require("express");
let router   = express.Router();
let db       = require("../models");
let middleware = require("../middleware");
let helpers  = require("../helpers/blogs");

/* index page */
router.get("/", helpers.indexAllBlog);

/* new blog request */
router.post("/", middleware.isLoggedIn, helpers.postNewBlog);

/* new blog form */
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("blogs/new", {pretty: true});
});

/* edit blog page */
router.get("/:id/edit", middleware.isAuthorizedBlog, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        res.render("blogs/edit", {blog: blog});
    })
});

/* show page */
router.route("/:id")
    .get(helpers.showSelectedBlog)
/* update blog request */
    .put(middleware.isAuthorizedBlog, helpers.updateSelectedBlog)
/* delete blog request */
    .delete(middleware.isAuthorizedBlog, helpers.deleteSelectedBlog);

module.exports = router;
