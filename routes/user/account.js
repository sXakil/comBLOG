let express    = require("express");
let router     = express.Router();
let db         = require("../../models");
let middleware = require("../../middleware");

router.get('/:username', middleware.isLoggedIn, (req, res) => {
  let reqUsername = req.params.username
  db.User.findOne({username: reqUsername}, (err, user) => {
    if(err) res.send(err)
    if(!user) res.render("404")
    else{
      res.render("user/account", {user, pretty: true})
    }
  })
})

module.exports = router