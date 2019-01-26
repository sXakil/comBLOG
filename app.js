const express        = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    db               = require("./models"),
    seedDB           = require("./seeds");
/* routes */
let campgroundRoute = require("./routes/campgrounds"),
    authRoute       = require("./routes/auth"),
    apiRoute        = require("./routes/api");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();

/* passport */
app.use(require("express-session")({
    secret: "ghent43765easter5684v509bnf5460q3brynn",
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
app.use(authRoute);
app.use('/campgrounds', campgroundRoute);
app.use('/api', apiRoute);

app.listen(3000, "localhost", function(){
    console.log("Server Has Started!");
});