var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

//GET index
//route to view all campground using mongodb and mongoose
router.get("/", function(req, res){
    //to show the details of the user
    // console.log(req.user)
    //get all campground from the database
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            //print error when one is encountered
            console.log(err); 
        }else{
           //to render the campgrounds
           //currentUser is an object that contains the signed in user id and usernamr
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    });
});

//new routes
//GET form to add new to make new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

//show route
router.get("/:id", function(req, res){
    //in the show route we are finding the data by Id
    //use the populate and exec function to show the comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
});
//create a new campground 
//POST route: takes data to display in the new route
router.post("/", middleware.isLoggedIn, function(req, res){//naming the post route the same as the get route//the same
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author, price: price};
    // console.log(newCampground)
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newcampground){
            if (err){
                console.log("HAVE AN ERROR");
                console.log(err); 
            }else{
                //redirect to campground pages
                res.redirect("/campgrounds")
            }
    })
});
//Edit campgorund route 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground does not exist")
            res.redirect("back")
        }
        res.render("campgrounds/edit", {campground: foundCampground})
    })
})
//Update campground route 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
           res.redirect("/campgrounds") 
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    })
})



module.exports = router;