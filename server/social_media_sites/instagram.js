const Brain = require("brain.js");
const apiKey = "7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b";
const axios = require('axios');
const brain = require("brain.js");
let trainingData = [];
function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
//console.log(timeConverter(0));


// Make a request for a user with a given ID
axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=ZAR&limit=2000&api_key=7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b')
    .then(function (response) {
        // handle success
        //console.log(JSON.stringify(response.data.Data.Data[0].time));
        for(let i=0; i<response.data.Data.Data.length;i++)
        {
            let rawdata = {
                //time: timeConverter(response.data.Data.Data[i].time),
                open: response.data.Data.Data[i].open,
                high: response.data.Data.Data[i].high,
                low: response.data.Data.Data[i].low,
                close: response.data.Data.Data[i].close

            }
            trainingData.push(rawdata)
            console.log(trainingData);
        }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });




