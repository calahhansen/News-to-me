# News-to-me

To see the deployed app, click on the [Heroku Link](https://news-to-me-ch.herokuapp.com/)

### Overview

In this assignment, I created a web app that lets users view and leave comments on the latest news. I didn't actually write any articles; instead, I used Mongoose and Cheerio to scrape news from another site.
1. Whenever a user visits, the app will scrape stories from a news outlet and display them for the user. Each scraped article is saved to the application database. The app displays the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

2. Users are able to leave comments on the articles displayed and revisit them later. The comments are saved to the database as well and associated with the user's articles. Users are able to delete their own comments left on articles. All stored comments should be visible to every user.

### NPM packages Used
1. express
2. express-handlebars
3. mongoose
4. cheerio
5. axios
