let express  = require("express");
let router   = express.Router();
let db       = require("../models");
let helpers  = require("../helpers/api");

/* all blog preview */
router.get('/', helpers.getAllBlog);

/* singular blog lookup */
router.get('/:id', helpers.getSelectedBlog)

module.exports = router;
