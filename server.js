// Dependencies
const express = require("express");
const logger = require("morgan");
// const mongojs = require("mongojs");
const mongoose = require('mongoose');

// Require axios and cheerio. This makes the scraping possible
const axios = require("axios");
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

//Configure middleware

app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static Folder is "public"
app.use(express.static("public"));

//Connect to Mongo DB 
// mongoose.connect('mongodb://localhost/mongoHeadlines', {
//   useNewUrlParser: true
// });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

//Grabbed from Slack - Julie's comments
mongoose.connect("mongodb://localhost/mongoHeadlines",
  { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log("DB Connection Error:", err.message);
  });;

// Main route (GET to scrape the badassquilters website)
app.get("/scrape", function (req, res) {
  // Make a request via axios to grab the HTML body from the site of your choice
  axios.get("https://www.badassquilterssociety.com/basically-badass-3/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(response.data);

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("article").each(function (i, element) {
      //Save the results object
      const results = {};
      //Add the title and link and save as properties/keys in the array
      results.title = $(this).children("a").text(); //this is referring to element I think...
      results.link = $(this).children("a").attr("href");

      // Save these results and push into result array
      results.push({
        title: title,
        link: link
      });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);

  });



  // TODO: make two more routes

  // Route 1
  // =======
  // This route will retrieve all of the data
  // from the scrapedData collection as a json (this will be populated
  // by the data you scrape using the next route)

  // Route 2
  // =======
  // When you visit this route, the server will
  // scrape data from the site of your choice, and save it to
  // MongoDB.
  // TIP: Think back to how you pushed website data
  // into an empty array in the last class. How do you
  // push it into a MongoDB collection instead?

  /* -/-/-/-/-/-/-/-/-/-/-/-/- */

  // Listen on port 3000
  app.listen(3000, function () {
    console.log("App running on port 3000!");
  });
})
