const axios = require('axios');
const cheerio = require('cheerio');
const twitter=require("tweet-scraper");
const User = require("../models/user")
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});
   // console.log(data);
    return data;
};
/* Tries to delete a user from the database
* @param {string} _id
* @return cryptocurrency data
* */
router.post("/getCryptodata",(request, response, next)=>
{
        User.findOne({ _id: token._id}, function (err, user) {
            if (!user) return response.status(400).send({ msg: 'User not found' });
            user.Verified = true;
            user.save(function (err) {
                if (err) { return response.status(500).send({ msg: err.message }); }
                response.status(200).send("Account successfully verified log in.");
            });
        });

});
