const http = require('http');
const app = require('./app');
const cron = require('node-cron');
const Reddit = require('./functions/Reddit');
const Twitter = require(`./functions/Twitter`);
const twitter = new Twitter().getInstance();
app.set(`port`, process.env.PORT || 8080);
app.set(`host`, process.env.HOST || `127.0.0.1`);
http.createServer(app).listen(app.get(`port`), app.get(`host`), () => {
    console.log(`Express app listening on ${app.get(`host`)}:${app.get(`port`)}`);
});

cron.schedule('*/10 * * * *', () => {
    twitter.getAllNamesTimeline().then()
    let reddits = new Reddit();
    reddits.completeScrape("CryptoCurrencies").then();
    reddits.completeScrape("SatoshiStreetBets").then();
    reddits.completeScrape("Crypto_Currency_News").then();
    reddits.completeScrape("CryptoCurrencyTrading").then();
    reddits.completeScrape("Cryptomarkets").then();
    reddits.completeScrape("Bitcoin").then();
    reddits.completeScrape("Ethereum").then();
});

