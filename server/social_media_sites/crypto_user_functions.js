const Twitter = require('twitter-v2');
const snoowrap = require('snoowrap');
const Sentiment = require('sentiment');
const vader = require('vader-sentiment');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: password
});
async function scrapeSubreddit() {

    const subreddit1 = await r.getSubreddit('Cryptomarkets');
    const subreddit2 = await r.getSubreddit('CryptoCurrencyTrading');
    const subreddit3 = await r.getSubreddit('Crypto_Currency_News');
    const subreddit4 = await r.getSubreddit('SatoshiStreetBets');
    const subreddit5 = await r.getSubreddit('CryptoCurrencies');
    let Cryptomarkets = [];
    let CryptoCurrencyTrading = [];
    let Crypto_Currency_News = [];
    let SatoshiStreetBets = [];
    let CryptoCurrencies = [];
    let emo = [];
    const topPosts1 = await subreddit1.getTop({ limit: 100});
    const topPosts2 = await subreddit2.getTop({ limit: 100});
    const topPosts3 = await subreddit3.getTop({ limit: 100});
    const topPosts4 = await subreddit4.getTop({ limit: 100});
    const topPosts5 = await subreddit5.getTop({ limit: 100});
    let data = [];
    let dataset = [];
    let uniquedataset = [];
    let tags = [ 'Ethereum','Litecoin','Cardano ','Polkadot', 'Stellar','Chainlink','Tether','Monero','ETH','LTC', 'ADA','DOT','BCH','XLM','BNB','USDT','XMR'];
    topPosts1.forEach((post) => {
        data.push(post.title);
        Cryptomarkets.push(post.title);
    });
    topPosts2.forEach((post) => {
        data.push(post.title);
        CryptoCurrencyTrading.push(post.title);
    });
    topPosts3.forEach((post) => {
        data.push(post.title);
        Crypto_Currency_News.push(post.title);
    });
    topPosts4.forEach((post) => {
        data.push(post.title);
        SatoshiStreetBets.push(post.title);
    });
    topPosts5.forEach((post) => {
        data.push(post.title);
        CryptoCurrencies.push(post.title);
    });
    for (var i = 0; i < data.length; i++)
    {
        for(var x = 0; x<tags.length;x++)
        {
            if(data[i].includes(tags[x]))
            {
                dataset.push(data[i]);
            }
        }
    }
    uniquedataset = dataset.filter((a, b) => dataset.indexOf(a) === b);
    var sentiment = new Sentiment();
    uniquedataset.forEach(function(s){
        console.log(sentiment.analyze(s));
    })
    uniquedataset.forEach(function(s){
        console.log( vader.SentimentIntensityAnalyzer.polarity_scores(s));
    })
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    const db = admin.firestore();
    const docRef = db.collection('sub_reddit_data').doc('leO350yIvsRsnjhtLizZ');

    await docRef.set({
        CryptoCurrencies: emo,
        CryptoCurrencyTrading: emo,
        Crypto_Currency_News: emo,
        Cryptomarkets: emo,
        SatoshiStreetBets: emo,
    });


    await docRef.set({
        CryptoCurrencies: CryptoCurrencies,
        CryptoCurrencyTrading: CryptoCurrencyTrading,
        Crypto_Currency_News: Crypto_Currency_News,
        Cryptomarkets: Cryptomarkets,
        SatoshiStreetBets: SatoshiStreetBets,
    });
}

scrapeSubreddit();


