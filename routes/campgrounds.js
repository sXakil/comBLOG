let express = require("express");
let router   = express.Router();
const Campground    = require("../models/campground"),
    Comment          = require("../models/comment");

router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            res.send(err);
        } else {
            res.render("index",{campgrounds:allCampgrounds, pretty: true});
        }
    });
});

router.post("/", isLoggedIn, (req, res) => {
    let newCampground = {
        name: req.body.name, 
        image: req.body.image, 
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    Campground.create(newCampground, (err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("new", {pretty: true});
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            res.send(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", isAuthorized, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("edit", {campground: foundCampground});
    })
});

router.put("/:id", isAuthorized, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, updatedCampground) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id)
        }
    })
})

router.delete("/:id", isAuthorized, isLoggedIn, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

router.post("/:id/comment", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            res.send(err);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id + "#" + campground.comments.length)
                }
            });
        }
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function isAuthorized(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                console.log(err);
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.send("Permission denied!")
                }
            }
        })
    } else {
        res.send("Permission denied!")
    }
}

module.exports = router;