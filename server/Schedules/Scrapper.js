const Reddit = require('../functions/Reddit');
const Twitter = require(`../functions/Twitter`);
const chan = require("../functions/chan");
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
    let chans = new chan()
    chans.crawlCatalogue().then(response => {
        let cryptos = ['bitcoin','ethereum','tether','binance','cardano','dogecoin','xrp','polkadot','litecoin','vechain','monero','btc','eth','usdt','bnb','ada','doge','ripple','chainlink','link','vet','xmr','shib'];
        let fin = []
        for(let i=0;i<response.length;i++)
        {

            response[i].opimg= "https:"+response[i].opimg;
            response[i].op.replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,'');
            response[i].op.replace(/^(?:[a-z]*?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi,'');
            for(let x=0;x<cryptos.length;x++)
            {

                if(response[i].op.toLowerCase().includes(cryptos[x]))
                {
                    fin.push(response[i]);
                }
            }
        }
        let uniqueArray = fin.filter(function(item, pos) {
            return fin.indexOf(item) == pos;
        })
        let empty = []
        chans.firestore_db.save('4chan_info','biz','posts',empty);
        chans.firestore_db.save('4chan_info','biz','posts',uniqueArray);
    }).catch(e => console.log(e));
    process.exit(0);
}

scrape().then(data=>{

})