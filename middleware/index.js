module.exports = mwObject = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    },
    isAuthorized: function(req, res, next) {
        if(req.isAuthenticated()) {
            db.Blog.findById(req.params.id, (err, blog) => {
                if(err) {
                    console.log(err);
                } else {
                    if(blog.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.send("Permission denied!")
                    }
                }
            })
        } else {
            res.send("Permission denied!")
        }
    },
    isAlreadyLoggedIn: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('back');
    }
};