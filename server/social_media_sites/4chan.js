const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');
const board = "biz";

const url = (board) => {
    return  'http://boards.4chan.org/' + board + '/catalog';
}

const crawlCatalogue = async() => {
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
                    data =
                        {
                            //id: $('.meta a').attr('data-post-menu'),
                            //    link: $('a').attr('href'),
                            //    img: $('img').attr('src'),
                            //     replies: $('.meta > b:nth-child(1)').text(),
                            //    imgReplies: $('.meta > b:nth-child(2)').text(),
                            //     title: $('.teaser > b').first().text(),
                            op: $('.teaser').text()
                            // title: $('.postMessage').text()
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

crawlCatalogue().then(response => {
    const flat= response.map(element => element.op);
    cryptos = ['bitcoin','ethereum','tether','binance','cardano','dogecoin','xrp','polkadot','litecoin','vechain','monero','btc','eth','usdt','bnb','ada','doge','ripple','chainlink','link','vet','xmr','shib'];
    let fin = [];
    flat.forEach(element => {
        element.replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,'');
        element.replace(/^(?:[a-z]*?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi,'');
        cryptos.forEach(coin => {
            if(element.toLowerCase().includes(coin))
            {
                fin.push(element);
            }
        })
    });
    uniqueArray = fin.filter(function(item, pos) {
        return fin.indexOf(item) == pos;
    })
    console.log(uniqueArray);
}).catch(e => console.log(e));
