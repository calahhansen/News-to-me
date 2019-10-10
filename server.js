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

// Initialize Express
const app = express();

const PORT = 3000;

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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

//Grabbed from Slack - Julie's comments
mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log("DB Connection Error:", err.message);
  });;

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/scrape.js")(app);
require("./routes/db-routes.js")(app);




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
app.listen(PORT, function () {
  console.log("App running on port 3000!");
});
