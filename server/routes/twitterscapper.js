const axios = require('axios');
const cheerio = require('cheerio');
const twitter=require("tweet-scraper");

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});
    data= data.data.tickers.filter(t => t.target == 'ZAR');
    console.log(data);
};
