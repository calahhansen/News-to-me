//this file offers a set of routes for displaying and saving data to the db

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // Route for getting all Articles from the db
    app.get("/blogs", function (req, res) {
        // Grab every document in the Articles collection
        db.Blogs.find({})
            .then(function (dbBlogs) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbBlogs);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/blogs/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Blogs.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("comment")
            .then(function (dbBlogs) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbBlogs);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/blogs/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Comments.create(req.body)
            .then(function (dbComments) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Blogs.findOneAndUpdate({ _id: req.params.id }, { comments: dbComments._id }, { new: true });
            })
            .then(function (dbBlogs) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbBlogs);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
}