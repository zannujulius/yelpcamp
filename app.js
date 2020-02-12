var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStratey    = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

   
mongoose.connect("mongodb+srv://zannujulius:JU.zan.@@@.1996@cluster0-8dsxq.mongodb.net/Yelpcamp?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true ,useFindAndModify: false});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))//using the __dirname shows the path
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database

//passport Config
app.use(require("express-session")({
    secret: "my market",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratey(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use route thet has the currentUser object
// every route should have a currentUser in its template 
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

//to tell app.js to use the routes that has been defined 
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes)//appends "/capmgorund" to the route df the campground" 
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 1500, function(){
    console.log("Yelp camp server started!!!");
});