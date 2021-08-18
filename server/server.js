const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const cron = require('node-cron');
const Reddit = require('./social_media_sites/Reddit');
const Twitter = require(`./social_media_sites/Twitter`);
const twitter = new Twitter().getInstance();
dotenv.config();
app.set(`port`, process.env.PORT || 8080);
app.set(`host`, process.env.HOST || `127.0.0.1`);
http.createServer(app).listen(app.get(`port`), app.get(`host`), () => {
    console.log(`Express app listening on ${app.get(`host`)}:${app.get(`port`)}`);
});
cron.schedule('*/10 * * * *', () => {
    //twitter.getAllNamesTimeline().then();
//     let reddits = new Reddit();
//     reddits.scrapeSubreddit("CryptoCurrencies").then();
//     reddits.scrapeSubreddit("SatoshiStreetBets").then();
//     reddits.scrapeSubreddit("Crypto_Currency_News").then();
//     reddits.scrapeSubreddit("CryptoCurrencyTrading").then();
//     reddits.scrapeSubreddit("Cryptomarkets").then();
//     reddits.scrapeSubreddit2("Bitcoin").then();
//     reddits.scrapeSubreddit2("Ethereum").then();
});

