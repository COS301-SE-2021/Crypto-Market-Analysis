const snoowrap = require('snoowrap');
const Sentiment = require('sentiment');
const Database = require('../database/Database');
const vader = require('vader-sentiment');
const admin = require('firebase-admin');
const serviceAccount = require('../database/firebase.json');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';
const empty = [];
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: password
});
class Reddit {
    #firestore_db = new Database().getInstance();

    scrapeSubredditCryptomarkets = async () => {
        const subreddit1 = await r.getSubreddit('Cryptomarkets');
        let Cryptomarkets = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Cryptomarkets.push(post.title);
        });
        this.#firestore_db.save('reddit_data',"CryptoCurrencies",'posts',empty);
    }

    scrapeSubredditCryptoCurrencyTrading = async () => {
        const subreddit2 = await r.getSubreddit('CryptoCurrencyTrading');
        let CryptoCurrencyTrading = [];
        const topPosts2 = await subreddit2.getTop({limit: 100});
        topPosts2.forEach((post) => {
            CryptoCurrencyTrading.push(post.title);
        });
        this.#firestore_db.save('reddit_data',"CryptoCurrencyTradings",'posts',empty);
    }

    scrapeSubredditCrypto_Currency_News = async () => {
        const subreddit3 = await r.getSubreddit('Crypto_Currency_News');
        let Crypto_Currency_News = [];
        const topPosts3 = await subreddit3.getTop({limit: 100});
        topPosts3.forEach((post) => {
            Crypto_Currency_News.push(post.title);
        });
        this.#firestore_db.save('reddit_data',"Crypto_Currency_New",'posts',empty);
    }

    scrapeSubredditSatoshiStreetBets = async () => {
        const subreddit4 = await r.getSubreddit('SatoshiStreetBets');
        let SatoshiStreetBets = [];
        const topPosts4 = await subreddit4.getTop({limit: 100});
        topPosts4.forEach((post) => {
            SatoshiStreetBets.push(post.title);
        });
        this.#firestore_db.save('reddit_data',"SatoshiStreetBets",'posts',empty);
    }

    scrapeSubredditCryptoCurrencies = async () => {
        const subreddit5 = await r.getSubreddit('CryptoCurrencies');
        let CryptoCurrencies = [];
        const topPosts5 = await subreddit5.getTop({limit: 100});
        topPosts5.forEach((post) => {
            CryptoCurrencies.push(post.title);
        });
        this.#firestore_db.save('reddit_data',"CryptoCurrencies",'posts',empty);
    }

    // scrapeSubreddit = async () => {
    //     const subreddit1 = await r.getSubreddit('Cryptomarkets');
    //     const subreddit2 = await r.getSubreddit('CryptoCurrencyTrading');
    //     const subreddit3 = await r.getSubreddit('Crypto_Currency_News');
    //     const subreddit4 = await r.getSubreddit('SatoshiStreetBets');
    //     const subreddit5 = await r.getSubreddit('CryptoCurrencies');
    //     let Cryptomarkets = [];
    //     let CryptoCurrencyTrading = [];
    //     let Crypto_Currency_News = [];
    //     let SatoshiStreetBets = [];
    //     let CryptoCurrencies = [];
    //     let emo = [];
    //     const topPosts1 = await subreddit1.getTop({limit: 100});
    //     const topPosts2 = await subreddit2.getTop({limit: 100});
    //     const topPosts3 = await subreddit3.getTop({limit: 100});
    //     const topPosts4 = await subreddit4.getTop({limit: 100});
    //     const topPosts5 = await subreddit5.getTop({limit: 100});
    //     let data = [];
    //     let dataset = [];
    //     let uniquedataset = [];
    //     let tags = ['Ethereum', 'Litecoin', 'Cardano ', 'Polkadot', 'Stellar', 'Chainlink', 'Tether', 'Monero', 'ETH', 'LTC', 'ADA', 'DOT', 'BCH', 'XLM', 'BNB', 'USDT', 'XMR'];
    //     for (let i = 0; i < 100; i++) {
    //         Cryptomarkets.push(topPosts1[i].title);
    //         CryptoCurrencyTrading.push(topPosts2[i].title);
    //         Crypto_Currency_News.push(topPosts3[i].title);
    //         SatoshiStreetBets.push(topPosts4[i].title);
    //         CryptoCurrencies.push(topPosts5[i].title);
    //     }
    //     this.#firestore_db.save('reddit_data',"CryptoCurrencies",'posts',Cryptomarkets);
    //     this.#firestore_db.save('reddit_data',"CryptoCurrencyTrading",'posts',CryptoCurrencyTrading);
    //     this.#firestore_db.save('reddit_data',"Crypto_Currency_News",'posts',Crypto_Currency_News);
    //     this.#firestore_db.save('reddit_data',"Cryptomarkets",'posts',Cryptomarkets);
    //     this.#firestore_db.save('reddit_data',"SatoshiStreetBets",'posts',Cryptomarkets);
        // topPosts1.forEach((post) => {
        //     data.push(post.title);
        //     Cryptomarkets.push(post.title);
        // });
        // topPosts2.forEach((post) => {
        //     data.push(post.title);
        //     CryptoCurrencyTrading.push(post.title);
        // });
        // topPosts3.forEach((post) => {
        //     data.push(post.title);
        //     Crypto_Currency_News.push(post.title);
        // });
        // topPosts4.forEach((post) => {
        //     data.push(post.title);
        //     SatoshiStreetBets.push(post.title);
        // });
        // topPosts5.forEach((post) => {
        //     data.push(post.title);
        //     CryptoCurrencies.push(post.title);
        // });
        //     for (var i = 0; i < data.length; i++)
        //     {
        //         for(var x = 0; x<tags.length;x++)
        //         {
        //             if(data[i].includes(tags[x]))
        //             {
        //                 dataset.push(data[i]);
        //             }
        //         }
        //     }
        //     uniquedataset = dataset.filter((a, b) => dataset.indexOf(a) === b);
        //     var sentiment = new Sentiment();
        //     uniquedataset.forEach(function(s){
        //         console.log(sentiment.analyze(s));
        //     })
        //     uniquedataset.forEach(function(s){
        //         console.log( vader.SentimentIntensityAnalyzer.polarity_scores(s));
        //     })
        //     admin.initializeApp({
        //         credential: admin.credential.cert(serviceAccount)
        //     });
        //     const db = admin.firestore();
        //     const docRef = db.collection('sub_reddit_data').doc('leO350yIvsRsnjhtLizZ');
        //
        //     await docRef.set({
        //         CryptoCurrencies: emo,
        //         CryptoCurrencyTrading: emo,
        //         Crypto_Currency_News: emo,
        //         Cryptomarkets: emo,
        //         SatoshiStreetBets: emo,
        //     });
        //
        //
        //     await docRef.set({
        //         CryptoCurrencies: CryptoCurrencies,
        //         CryptoCurrencyTrading: CryptoCurrencyTrading,
        //         Crypto_Currency_News: Crypto_Currency_News,
        //         Cryptomarkets: Cryptomarkets,
        //         SatoshiStreetBets: SatoshiStreetBets,
        //     });
        // }
    //}
}
let reddits = new Reddit();
// reddits.scrapeSubreddit();
reddits.scrapeSubredditCryptoCurrencies();
reddits.scrapeSubredditSatoshiStreetBets();
reddits.scrapeSubredditCrypto_Currency_News();
reddits.scrapeSubredditCryptoCurrencyTrading();
reddits.scrapeSubredditCryptoCurrencyTrading();