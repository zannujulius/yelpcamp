var mongoose = require("mongoose");
//create a schema for the comments having 
// text and author
var commentSchemma = mongoose.Schema({
    text: String,
    author: {//the purpose of having to object is to associate the username to the comment 
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    }
});
//use the singular name as the mongoose model name 
module.exports = mongoose.model("Comment", commentSchemma);  