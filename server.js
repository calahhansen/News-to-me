// Dependencies
const express = require("express");
const logger = require("morgan");
// const mongojs = require("mongojs");
const mongoose = require('mongoose');

// Require axios and cheerio. This makes the scraping possible
// const axios = require("axios"); moved to routes/scrape.js
// const cheerio = require("cheerio"); moved to routes/scrape.js

//Require all models
//const db = require("./models"); moved to routes/db-routes.js

// Initialize Express
const app = express();

const PORT = process.env.PORT || 3000;

//Configure middleware

app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true })); //added to routes/scrape.js
app.use(express.json()); //added to routes/scrape.js
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

// Route 1
// =======
// This route will be used to route the handlebar pages (not sure about how to get this working....)
require("./routes/router.js")(app);

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to MongoDB.
// This route is working and scraping and pushing into the database!!!
require("./routes/scrape.js")(app);

// Route 3
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json 
//NOT WORKING...
require("./routes/db-routes.js")(app);


// EXPRESS APP - Listen on port 3000
//db.
app.listen(PORT, function () {
  console.log("Express App Server listening on PORT " + PORT);
});
