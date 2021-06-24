var scrapper = require('instagram-scraping');

scrapper.scrapeTag('bitcoin').then(result => {
    console.dir(result);
});
