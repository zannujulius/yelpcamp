var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    //when the campground is created, we save the id and username 
    //and save them to the auth route 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        // Association Reference
        //assoociating the Comment object to the CampgroundSchema 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"//name of the model
    }]
});
// to set up the model
module.exports = mongoose.model("Campground", campgroundSchema);