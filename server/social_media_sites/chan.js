const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');
const board = "biz";
const empty = [];
const Database = require('../database/Database');
var Filter = require('bad-words'),
filter = new Filter();
const User_Hash_Table = require(`../Hash_Tables/User_Hash_Table`);
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
        console.log("Starting crawl process for /" + board + "/");
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
                    console.log('Found ' + threads.length + ' threads. Mapping to objects...');
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
            console.log(err);
        }
    }
}


module.exports = chan;

