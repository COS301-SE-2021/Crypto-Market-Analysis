const snoowrap = require('snoowrap');
const Database = require('../database/Database');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const pass = 'Ndhlovu4Lyf';
const empty = [];
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: pass
});

class Reddit {
    #firestore_db = new Database().getInstance();
    scrapeSubreddit = async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(post.title);
        });
        this.#firestore_db.save('reddit_data',Subreddit,'posts',empty);
        this.#firestore_db.save('reddit_data',Subreddit,'posts',Data);
    }
    scrapeSubreddit2 = async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(post.title);
        });
        this.#firestore_db.save('Reddit',Subreddit,'post',empty);
        this.#firestore_db.save('Reddit',Subreddit,'post',Data);
    }
}

// let reddits = new Reddit();
// reddits.scrapeSubreddit("CryptoCurrencies").then();
// reddits.scrapeSubreddit("SatoshiStreetBets").then();
// reddits.scrapeSubreddit("Crypto_Currency_News").then();
// reddits.scrapeSubreddit("CryptoCurrencyTrading").then();
// reddits.scrapeSubreddit("Cryptomarkets").then();
// reddits.scrapeSubreddit2("Bitcoin").then();
// reddits.scrapeSubreddit2("Ethereum").then();

module.exports = Reddit;
