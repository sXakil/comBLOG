let express    = require("express");
let router     = express.Router();
let db         = require("../models");
let middleware = require("../middleware");
let helpers    = require("../helpers/comments");

/* new comment request */
router.post("/:id/comment", middleware.isLoggedIn, helpers.postComment);

router.route("/:id/comment/:comId")
/* delete comment request */
    .delete(middleware.isAuthorizedComment, helpers.deleteComment)
/* edit comment request */
    .put(middleware.isAuthorizedComment, helpers.updateComment);

/* edit comment page */
router.get("/:id/comment/:comId/edit", middleware.isAuthorizedBlog, helpers.editCommentPage);

module.exports = router;
