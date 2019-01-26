let express = require("express");
let router   = express.Router();
const Campground    = require("../models/campground");

router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) res.send(err)
        else res.json(allCampgrounds);
    })
})
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) res.send(err)
        else res.json(foundCampground);
    })
})

module.exports = router;