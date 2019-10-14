// Dependencies
// =============================================================
const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const blogs = require("../models/blogs");

// Routes
// =============================================================
module.exports = function (app) {

  // Create all our routes and set up logic within those routes where required.
  router.get("/", function (req, res) {
    blogs.all(function (data) {
      const hbsObject = {
        blogs: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  router.post("/api/blogs", function (req, res) {
    blogs.create([
      "title", "link", "summary"
    ], [
      req.body.title, req.body.link
    ], function (result) {
      // Send back the ID of the new article
      res.json({ id: result.insertId });
    });
  });

  router.put("/api/blogs/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    blogs.update({
      link: req.body.link
    }, condition, function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.delete("/api/blogs/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    blogs.delete(condition, function (result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
}
