const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const cron = require('node-cron');
const Reddit = require('./social_media_sites/Reddit');
dotenv.config();
const port = process.env.port || 8080;
console.log(`Listening on port ${port}`);
http.createServer(app);
// cron.schedule('*/10 * * * *', () => {
//     let reddits = new Reddit();
//     reddits.scrapeSubreddit("CryptoCurrencies").then();
//     reddits.scrapeSubreddit("SatoshiStreetBets").then();
//     reddits.scrapeSubreddit("Crypto_Currency_News").then();
//     reddits.scrapeSubreddit("CryptoCurrencyTrading").then();
//     reddits.scrapeSubreddit("Cryptomarkets").then();
//     reddits.scrapeSubreddit2("Bitcoin").then();
//     reddits.scrapeSubreddit2("Ethereum").then();
// });
app.listen(port);

