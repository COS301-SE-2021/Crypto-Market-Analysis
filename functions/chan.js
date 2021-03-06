const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');
const board = "biz";
const empty = [];
const Database = require('../database/Database');
var Filter = require('bad-words'),
filter = new Filter();
const User_Hash_Table = require(`../functions/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();



const url = (board) => {
    return  'http://boards.4chan.org/' + board + '/catalog';
}

class chan {
    firestore_db = new Database().getInstance();


    get4chanPost = async ()=>{
        let fourChanPosts = [];

        try{
            const docs = await firestore_db.fetch(`4chan_info`).then((snapshot) => {return snapshot.docs;});
            for(const doc of docs)
                fourChanPosts.push(doc.data().posts);

            return {status: `Ok`, posts_array: fourChanPosts};
        }
        catch(err){
            return Promise.reject(new Error(err));
        }
    }

    crawlCatalogue = async() => {
        const nightmare = new Nightmare({ show: false });
        try {
            let threadArray = [];
            let threads = await nightmare.goto(url(board))
                .wait('#threads .thread')
                .evaluate(() => {
                    let elements = Array.from(document.getElementsByClassName('thread'));
                    return elements.map(elem => {
                        return {
                            content: elem.innerHTML
                        }
                    });
                })
                .end()
                .then(threads => {
                    let formatted = threads.map(item => {
                        let $ = cheerio.load(item.content);
                        let data =
                            {

                                opimg: $('img').attr('src'),

                                op: $('.teaser').text()

                            }
                        return data;

                    });
                    return formatted;
                });
            return threads;
        } catch(err) {
        }
    }
}

// let chans = new chan()
// chans.crawlCatalogue().then(response => {
//     let cryptos = ['bitcoin','ethereum','tether','binance','cardano','dogecoin','xrp','polkadot','litecoin','vechain','monero','btc','eth','usdt','bnb','ada','doge','ripple','chainlink','link','vet','xmr','shib'];
//     let fin = []
//     for(let i=0;i<response.length;i++)
//     {
//
//             response[i].opimg= "https:"+response[i].opimg;
//             response[i].op.replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?????????????????]))/g,'');
//             response[i].op.replace(/^(?:[a-z]*?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi,'');
//         for(let x=0;x<cryptos.length;x++)
//         {
//
//             if(response[i].op.toLowerCase().includes(cryptos[x]))
//             {
//                 fin.push(response[i]);
//             }
//         }
//     }
//     let uniqueArray = fin.filter(function(item, pos) {
//         return fin.indexOf(item) == pos;
//     })
//
//     chans.firestore_db.save('4chan_info','biz','posts',empty);
//     chans.firestore_db.save('4chan_info','biz','posts',uniqueArray);
// }).catch(e => console.log(e));

module.exports = chan;

