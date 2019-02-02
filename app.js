const express        = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    db               = require("./models"),
    flash            = require("connect-flash"),
    back             = require('express-back'),
    seedDB           = require("./seeds");
/* routes */
let blogsRoute      = require("./routes/blogs"),
    commentsRoute   = require("./routes/comments"),
    authRoute       = require("./routes/auth"),
    apiRoute        = require("./routes/api");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();

/* passport */
app.use(require("express-session")({
    secret: "DC64B7D980E7EFFEE4070C282A9AC863F7A83E9EB890E16606ADC5C25A457CD2",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
app.use(back());
app.use(flash());
app.use(authRoute);
app.use('/blogs', blogsRoute);
app.use('/blogs', commentsRoute);
app.use('/api', apiRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server launched!");
});