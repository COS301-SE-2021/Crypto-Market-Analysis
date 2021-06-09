const Twitter = require('twitter-v2');
const snoowrap = require('snoowrap');
const Sentiment = require('sentiment');
const vader = require('vader-sentiment');
const admin = require('firebase-admin');
const serviceAccount = require('codex-crypto-market-analysis-98cca9c9a2cc.json');

//initialize
const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';
const client = new Twitter({consumer_key, consumer_secret, access_token, access_secret_token});

//intialize reddit
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';


async function scrapeSubreddit() {
    const r = new snoowrap({
        userAgent: userAgent,
        clientId: clientId,
        clientSecret: clientSecret,
        username: username,
        password: password
    });

//subreddits
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

    const topPosts1 = await subreddit1.getTop({ limit: 100});
    const topPosts2 = await subreddit2.getTop({ limit: 100});
    const topPosts3 = await subreddit3.getTop({ limit: 100});
    const topPosts4 = await subreddit4.getTop({ limit: 100});
    const topPosts5 = await subreddit5.getTop({ limit: 100});


    let data = [];
    let dataset = [];
    let uniquedataset = [];
    //Tags should be from coin ghecko but its too slow
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
                //console.log(data[i]);
                dataset.push(data[i]);
            }
        }
    }
    uniquedataset = dataset.filter((a, b) => dataset.indexOf(a) === b);
    //console.log(uniquedataset);


    var sentiment = new Sentiment();
    uniquedataset.forEach(function(s){
        console.log(sentiment.analyze(s));
    })

    uniquedataset.forEach(function(s){
        console.log( vader.SentimentIntensityAnalyzer.polarity_scores(s));
    })

    //firebase saving of scrapped data

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();

    const docRef = db.collection('sub_reddit_data').doc('leO350yIvsRsnjhtLizZ');

    await docRef.set({
        CryptoCurrencies: CryptoCurrencies,
        CryptoCurrencyTrading: CryptoCurrencyTrading,
        Crypto_Currency_News: Crypto_Currency_News,
        Cryptomarkets: Cryptomarkets,
        SatoshiStreetBets: SatoshiStreetBets,
    });

}

const getTweets = async () => {
    /*const { data } = await client.get('statuses/user_timeline', { screen_name: 'elonmusk' });
    console.log(data);*/
    const { data } = await client.get('users/44196397/tweets?max_results=100', );
    console.log(data);
}



getTweets().then();
scrapeSubreddit();



