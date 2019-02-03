let express    = require("express");
let router     = express.Router();
let db         = require("../models");
let middleware = require("../middleware");
let helpers  = require("../helpers/comments");

/* new comment request */
router.post("/:id/comment", middleware.isLoggedIn, helpers.postComment);

router.route("/:id/comment/:comId")
/* delete comment request */
    .delete(middleware.isAuthorizedComment, helpers.deleteComment)
/* edit comment request */
    .put(middleware.isAuthorizedComment, helpers.updateComment);

/* edit comment page */
router.get("/:id/comment/:comId/edit", middleware.isAuthorizedBlog, (req, res) => {
    db.Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.send(err);
        } else {
            db.Comment.findById(req.params.comId, (err, comment) => {
                if(err) {
                    res.send(err);
                } else {
                    res.render("comments/edit", {blog : blog, comment : comment})
                }
            })
        }
    })
});

module.exports = router;
