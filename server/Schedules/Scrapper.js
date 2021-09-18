const Reddit = require('../functions/Reddit');
const Twitter = require(`../functions/Twitter`);
const twitter = new Twitter().getInstance();
let reddits = new Reddit();
const scrape=async ()=>{
    twitter.getAllNamesTimeline().then()
    reddits.completeScrape("CryptoCurrencies").then();
    reddits.completeScrape("Bitcoin").then();
    reddits.completeScrape("Ethereum").then();
    reddits.completeScrape("Algorand").then();
    reddits.completeScrape("Cardano").then();
    reddits.completeScrape("Dogecoin").then();
    reddits.completeScrape("Tether").then();
    reddits.completeScrape("Uniswap").then();
    reddits.completeScrape("XRP").then();
    reddits.completeScrape("SatoshiStreetBets").then();
    reddits.completeScrape("Crypto_Currency_News").then();
    reddits.completeScrape("CryptoCurrencyTrading").then();
    reddits.completeScrape("Cryptomarkets").then();
    process.exit(0);
}

scrape().then(data=>{

})