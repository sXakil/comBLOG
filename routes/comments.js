let express    = require("express");
let router     = express.Router();
let db         = require("../models");
let middleware = require("../middleware");
let helpers  = require("../helpers/comments");

/* new comment request */
router.post("/:id/comment", middleware.isLoggedIn, helpers.postComment);

/* delete a comment */
router.delete("/:id/comment/:comId", middleware.isAuthorizedComment, helpers.deleteComment)

module.exports = router;
