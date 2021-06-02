const axios = require('axios');
const cheerio = require('cheerio');
const twitter=require("tweet-scraper");

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});
   // console.log(data);
    return data;
};
