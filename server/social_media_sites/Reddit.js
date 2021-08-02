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


        completeScrape= async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(
                {
                    text: post.title,
                    link: post.url,
                    score: post.score,
                    author: post.author.name
                  }

            );
        });
        // console.log(Data)
        this.#firestore_db.save('reddit_info',Subreddit,'posts',empty);
        this.#firestore_db.save('reddit_info',Subreddit,'posts',Data);
        // this.#firestore_db.save('reddit_data',Subreddit,'posts',Data);
    }

    getAll= async () => {
        const emails = await this.#firestore_db.fetch("Subreddits","allSubreddits","reddits");
        console.log(emails);
    }

}

let reddits = new Reddit();
// reddits.completeScrape("CryptoCurrencies").then();
// reddits.completeScrape("SatoshiStreetBets").then();
// reddits.completeScrape("Crypto_Currency_News").then();
// reddits.completeScrape("CryptoCurrencyTrading").then();
// reddits.completeScrape("Cryptomarkets").then();
reddits.getAll().then(r => console.log(r));

module.exports = Reddit;
