var Campground  =   require("../models/campground");
var Comment     =   require("../models/comment");
//all the middle ware goes here
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership  =   function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                req.flash("error", "Campground not found")
                res.redirect("back")
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnerShip = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){

                res.redirect("back")
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}

//isloggedIn
middlewareObj.isLoggedIn =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }//the error is the key while the "Please login First" is the value
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports  =   middlewareObj;