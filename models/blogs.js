//import mongoose
const mongoose = require("mongoose");
//Schema constructor
const Schema = mongoose.Schema;
//make a new blog schema
const BlogsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // image: String,
    // summary: String,
    // comments: {
    //     type: Schema.Types.ObjectId, //NOT SURE HOW this can apply/connect to comments
    //     ref: "Comments"
    // }
});

const Blogs = mongoose.model("Blogs", BlogsSchema);

//exports the blogs model so we can use it elsewhere
module.exports = Blogs;