const Brain = require("brain.js");
const apiKey = process.env.API_KEY;

const axios = require('axios');
const {performance} = require('perf_hooks');
const brain = require("brain.js");
const Database = require('../database/Database');
let trainingData = [];
let openMin = Infinity;
let closeMin = Infinity;
let lowMin = Infinity;
let highMin = Infinity;
let arr = [];
let store;

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

function scaleDown(step) {
    return {
        open: (step.open/openMin),
        high: (step.high/highMin),
        low: (step.low/lowMin),
        close: (step.close/closeMin)
    };
}

function scaleUp(step) {
    return {
        open: step.open * openMin,
        high: step.high * highMin,
        low: step.low * lowMin,
        close: step.close * closeMin
    };
}

class NeuralNetwork {
    #firestore_db = new Database().getInstance();

    allCoins= async () => {
        let val;
        let test;
        let arr = [];
        return val = await this.#firestore_db.fetch(`Users`)
            .then( snapshot => {
                const docs = snapshot.docs;
                for (const doc of docs) {
                    if (doc.data().crypto) {
                        arr.push(doc.data().crypto)
                    }
                }

                let flat = arr.flat();
                let unique = flat.filter((item, i, ar) => ar.indexOf(item) === i);
                // arr = flat
                return unique;
            }).catch((error) => {
                console.error(error);
            });
        // return arr;
    }

    train= async (coin) =>  {
        await axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym='+coin+'&tsym=USD&limit=19&api_key='+apiKey)
            .then(function (response) {
                trainingData = [];
                openMin = Infinity;
                closeMin = Infinity;
                lowMin = Infinity;
                highMin = Infinity;
                arr = [];
                store= 0;
                for(let i=0; i<response.data.Data.Data.length;i++)
                {
                    if (response.data.Data.Data[i].open < openMin)
                    {
                        openMin = response.data.Data.Data[i].open;
                    }
                    if (response.data.Data.Data[i].close < closeMin)
                    {
                        closeMin = response.data.Data.Data[i].close;
                    }
                    if (response.data.Data.Data[i].low < lowMin)
                    {
                        lowMin = response.data.Data.Data[i].low;
                    }
                    if (response.data.Data.Data[i].high < highMin)
                    {
                        highMin = response.data.Data.Data[i].high;
                    }
                    let rawdata = {
                        coin: coin,
                        time: timeConverter(response.data.Data.Data[i].time),
                        open: response.data.Data.Data[i].open,
                        high: response.data.Data.Data[i].high,
                        low: response.data.Data.Data[i].low,
                        close: response.data.Data.Data[i].close
                    }
                    trainingData.push(rawdata)

                }
            })
            .catch(function (error) {
                console.error("failed to load historical data for " + coin)
                return Promise.reject(error);
            })
            .then(function () {
                const scaledData = trainingData.map(scaleDown);

                const trainingDatas = [
                    scaledData.slice(0, 5),
                    scaledData.slice(5, 10),
                    scaledData.slice(10, 15),
                    scaledData.slice(15, 20),
                ];



                const net = new brain.recurrent.LSTMTimeStep({
                    inputSize: 4,
                    HiddenLayers: [8,8],
                    outputSize: 4
                });


                net.train(trainingDatas, {
                    learningRate: 0.005,
                    errorThresh: 0.0000000000002,
                    MaxIterations: 50
                });

                store = net.forecast([
                    trainingDatas[0][0],
                    trainingDatas[0][1],
                ], 1).map(scaleUp)
            }).finally(function () {




                }
            );

        try{
            await this.#firestore_db.save('CryptoPricePrediction',coin,'open',store[0].open);
            await this.#firestore_db.save('CryptoPricePrediction',coin,'high',store[0].high);
            await this.#firestore_db.save('CryptoPricePrediction',coin,'low',store[0].low);
            await this.#firestore_db.save('CryptoPricePrediction',coin,'close',store[0].close);
            await this.#firestore_db.save('CryptoPricePrediction',coin,'coin', coin);
        }
        catch (error){
            return Promise.reject(error);
        }


    }

}
module.exports = NeuralNetwork;




// let network = new NeuralNetwork();

// network.train("btc").then(function (store) {
//     network.train("eth").then(function (store) {
//         network.train("usdt").then(function (store) {
//             network.train("bnb").then(function (store) {
//                 network.train("ada").then(function (store) {
//                     network.train("xrp").then(function (store) {
//                         network.train("doge").then(function (store) {
//                             network.train("usdc").then(function (store) {
//                                 network.train("dot").then(function (store) {
//                                     network.train("uni").then(function (store) {
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// })























