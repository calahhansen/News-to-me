//import mongoose
const mongoose = require("mongoose");
//constructor part not totally sure on....
const Schema = mongoose.Schema;
//use the schema to make a comment object
const CommentSchema = new Schema({
    comment: String,
    userName: String
});

const Comment = mongoose.model("Comment", CommentSchema);

//Export the comment
module.exports = Comment;