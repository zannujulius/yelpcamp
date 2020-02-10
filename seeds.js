var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//to create a bunch of different data
var data = [
    {
        name: "cloud rest", 
        image: "https://images.unsplash.com/photo-1574705512250-8725e692fd91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in "
    },
    {
        name: "caves Inn", 
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in "
    },
    {
        name: "Olivines Inn", 
        image: "https://images.unsplash.com/photo-1574705512250-8725e692fd91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in "
    }
]
function seedDB(){
    //removed all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed all camgrounds")
        //add a few campground
        //loop through the data
        //that is all through the object in the data 
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                }else{
                    console.log("added campground")
                    //create a comment
                    Comment.create({
                        text:"this place is great",
                        author: "james "
                    }, function(err, comment){
                        if(err){
                           console.log(err)
                        }else{
                            //associate the comment with the user 
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment")
                        }
                    });
                }
            }); 
        });
    });
}
module.exports = seedDB;