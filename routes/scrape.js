// Dependencies
const express = require("express");

// Require axios and cheerio. This makes the scraping possible
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
module.exports = function (app) {
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
            res.send("connected")

        });
    })
}