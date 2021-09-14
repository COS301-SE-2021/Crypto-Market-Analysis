const http = require('http');
const app = require('./app');
const cron = require('node-cron');
const Reddit = require('./functions/Reddit');
const Twitter = require(`./functions/Twitter`);
const twitter = new Twitter().getInstance();

const port = process.env.PORT || 8080;
http.createServer(app).listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
cron.schedule('*/10 * * * *', () => {
    twitter.getAllNamesTimeline().then()
//     let reddits = new Reddit();
//     reddits.scrapeSubreddit("CryptoCurrencies").then();
//     reddits.scrapeSubreddit("SatoshiStreetBets").then();
//     reddits.scrapeSubreddit("Crypto_Currency_News").then();
//     reddits.scrapeSubreddit("CryptoCurrencyTrading").then();
//     reddits.scrapeSubreddit("Cryptomarkets").then();
//     reddits.scrapeSubreddit2("Bitcoin").then();
//     reddits.scrapeSubreddit2("Ethereum").then();
});

