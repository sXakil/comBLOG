/* requiring necessary packages */
const express        = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    db               = require("./models"),
    flash            = require("connect-flash"),
    back             = require('express-back')

/* requiring the routes */
let blogsRoute      = require("./routes/blogs"),
    commentsRoute   = require("./routes/comments"),
    authRoute       = require("./routes/auth"),
    apiRoute        = require("./routes/api"),
    userRoute       = require("./routes/user/profile")


app.use(bodyParser.urlencoded({extended: true})); //params and form data collector
app.set("view engine", "pug"); //defaults .pug for view engine extensions
app.use(express.static(__dirname + "/public")); //makes the directory available to the client side
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method")); //helps with the RESTful routing methods

/* passport config */
app.use(require("express-session")({
    secret: "DC64B7D980E7EFFEE4070C282A9AC863F7A83E9EB890E16606ADC5C25A457CD2",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(db.User.authenticate()))
passport.serializeUser(db.User.serializeUser())
passport.deserializeUser(db.User.deserializeUser())

app.use(back()); //keeps track of the previous link
app.use(flash()); //handles the flash messages

/* makes currentUser available to all routes */
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.warning     = req.flash('warning')
    res.locals.success     = req.flash('success')
    res.locals.error       = req.flash('error')
    next();
})

/* use the routes */
app.use(authRoute)
app.use('/blogs', blogsRoute)
app.use('/blogs', commentsRoute)
app.use('/api', apiRoute)
app.use('/user', userRoute)

app.get('/404', (req, res) => {
    res.render('404', {pretty: true, warning: req.flash('warning')})
})

app.get('/*', (req, res) => {
    req.flash('warning', "Error 404! Page not found")
    res.redirect('/404')
})

/* starts the server */
app.listen(3000, 'localhost', function(){
    console.log("Server launched!")
})