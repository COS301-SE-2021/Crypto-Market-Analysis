const Brain = require("brain.js");
const apiKey = "7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b";
const axios = require('axios');
const brain = require("brain.js");
let trainingData = [];


const rawData = [{"date":"2018-11-02","open":141.0716,"high":141.1014,"low":138.7762,"close":139.7898,"volume":7673303,"unadjustedVolume":7673303,"change":-0.139114,"changePercent":-0.099,"vwap":139.5278,"label":"Nov 2","changeOverTime":0},{"date":"2018-11-05","open":140.1078,"high":141.8367,"low":138.1204,"close":141.3002,"volume":5601398,"unadjustedVolume":5601398,"change":1.5104,"changePercent":1.08,"vwap":141.2547,"label":"Nov 5","changeOverTime":0.010804794055073943},{"date":"2018-11-06","open":140.6344,"high":141.9262,"low":140.1674,"close":141.6678,"volume":5798915,"unadjustedVolume":5798915,"change":0.367659,"changePercent":0.26,"vwap":141.4935,"label":"Nov 6","changeOverTime":0.013434456591253337},{"date":"2018-11-07","open":142.1945,"high":143.9567,"low":142.0653,"close":143.834,"volume":7173590,"unadjustedVolume":7173590,"change":2.1662,"changePercent":1.529,"vwap":143.4709,"label":"Nov 7","changeOverTime":0.0289305800566278},{"date":"2018-11-08","open":143.3968,"high":144.8695,"low":143.0888,"close":144.3805,"volume":5497130,"unadjustedVolume":5497130,"change":0.54652,"changePercent":0.38,"vwap":144.2387,"label":"Nov 8","changeOverTime":0.03284002123187813},{"date":"2018-11-09","open":144.1222,"high":144.8178,"low":143.4664,"close":144.4203,"volume":5343206,"unadjustedVolume":5343206,"change":0.039746,"changePercent":0.028,"vwap":144.4139,"label":"Nov 9","changeOverTime":0.03312473442268308},{"date":"2018-11-12","open":144.0725,"high":145.3146,"low":143.8141,"close":144.6985,"volume":7013577,"unadjustedVolume":7013577,"change":0.278229,"changePercent":0.193,"vwap":144.6873,"label":"Nov 12","changeOverTime":0.03511486531921486},{"date":"2018-11-13","open":145.2649,"high":145.8214,"low":142.5124,"close":143.7645,"volume":7432438,"unadjustedVolume":7432438,"change":-0.934052,"changePercent":-0.646,"vwap":143.9306,"label":"Nov 13","changeOverTime":0.028433405012382763},{"date":"2018-11-14","open":144.1023,"high":144.3905,"low":142.6516,"close":143.3372,"volume":6433077,"unadjustedVolume":6433077,"change":-0.427279,"changePercent":-0.297,"vwap":143.4752,"label":"Nov 14","changeOverTime":0.025376672689995848},{"date":"2018-11-15","open":142.5025,"high":143.5955,"low":141.5784,"close":143.5856,"volume":6658019,"unadjustedVolume":6658019,"change":0.248418,"changePercent":0.173,"vwap":142.7533,"label":"Nov 15","changeOverTime":0.027153626373311823},{"date":"2018-11-16","open":143.7943,"high":145.8114,"low":143.6353,"close":145.0662,"volume":8494311,"unadjustedVolume":8494311,"change":1.4806,"changePercent":1.031,"vwap":144.8256,"label":"Nov 16","changeOverTime":0.03774524321517017},{"date":"2018-11-19","open":145.5034,"high":147.5007,"low":145.4438,"close":146.7952,"volume":8714603,"unadjustedVolume":8714603,"change":1.729,"changePercent":1.192,"vwap":146.6115,"label":"Nov 19","changeOverTime":0.050113813740344286},{"date":"2018-11-20","open":146.5666,"high":147.8087,"low":145.4239,"close":145.5233,"volume":8937990,"unadjustedVolume":8937990,"change":-1.2719,"changePercent":-0.866,"vwap":146.2531,"label":"Nov 20","changeOverTime":0.04101515275077289},{"date":"2018-11-21","open":145.3047,"high":145.3047,"low":139.8891,"close":141.0915,"volume":10275810,"unadjustedVolume":10275810,"change":-4.4318,"changePercent":-3.045,"vwap":141.4162,"label":"Nov 21","changeOverTime":0.009311838202787201},{"date":"2018-11-23","open":140.9524,"high":141.8268,"low":140.704,"close":141.33,"volume":3404882,"unadjustedVolume":3404882,"change":0.238482,"changePercent":0.169,"vwap":141.3418,"label":"Nov 23","changeOverTime":0.01101797126828995},{"date":"2018-11-26","open":142,"high":142.05,"low":140.715,"close":141.37,"volume":7590941,"unadjustedVolume":7590941,"change":0.040031,"changePercent":0.028,"vwap":141.16,"label":"Nov 26","changeOverTime":0.01130411517864673},{"date":"2018-11-27","open":140.57,"high":143.35,"low":139.66,"close":143.22,"volume":5962112,"unadjustedVolume":5962112,"change":1.85,"changePercent":1.309,"vwap":141.5703,"label":"Nov 27","changeOverTime":0.02453827103265034},{"date":"2018-11-28","open":143.83,"high":146.56,"low":143.36,"close":146.44,"volume":8411383,"unadjustedVolume":8411383,"change":3.22,"changePercent":2.248,"vwap":145.5168,"label":"Nov 28","changeOverTime":0.04757285581637561},{"date":"2018-11-29","open":145.62,"high":147.2,"low":144.84,"close":145.85,"volume":6900046,"unadjustedVolume":6900046,"change":-0.59,"changePercent":-0.403,"vwap":146.1078,"label":"Nov 29","changeOverTime":0.04335223313861226},{"date":"2018-11-30","open":145.34,"high":147,"low":145.1,"close":146.9,"volume":12517550,"unadjustedVolume":12517550,"change":1.05,"changePercent":0.72,"vwap":146.2548,"label":"Nov 30","changeOverTime":0.05086351078547928}];
// rawData = [{ open: number, high: number, low: number, close: number }]
//138 is used below cause its the lowest value for open
//or we can
// bonus
// open: (step.open - lowest) / (highest - lowest),
// open: (140 - 138) / (147 - 138)
// actually equals:
// 140 - 138 = 2
// 147 - 138 = 9
// 2 / 9 = 0.22222222

//test
//
// function scaleDown(step) { // normalize
//     return {
//         open: step.open / 138,
//         high: step.high / 138,
//         low: step.low / 138,
//         close: step.close / 138
//     };
// }
//
// //console.log(scaleDown(rawData[0]));
//
// function scaleUp(step) { // denormalize
//     return {
//         open: step.open * 138,
//         high: step.high * 138,
//         low: step.low * 138,
//         close: step.close * 138
//     };
// }
//
// const scaledData = rawData.map(scaleDown);
//
// const trainingData = [
//     scaledData.slice(0, 5),
//     scaledData.slice(5, 10),
//     scaledData.slice(10, 15),
//     scaledData.slice(15, 20),
// ];
//
// //console.log(trainingData);
//
// const net = new brain.recurrent.LSTMTimeStep({
//     //we have open close high and low so its 4 for input and output
//     //Hidden layers are the layers that lie between the input and output layer of a neural network.
//     inputSize: 4,
//     HiddenLayers: [8,8],
//     outputSize: 4
// });
//
// //iterations of training
// net.train(trainingData, {
//     learningRate: 0.005,
//     errorThresh: 0.02,
//     //log: (stats) => console.log(stats)
// });
//
// console.log(net.forecast([
//     trainingData[0][0],
//     trainingData[0][1],
// ], 3).map(scaleUp));
//test

//console.log(scaleUp(net.run(trainingData[0])));


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


function scaleDown(step) { // denormalize
    return {
        open: (step.open/openMin),
        high: (step.high/highMin),
        low: (step.low/lowMin),
        close: (step.close/closeMin)
    };
}

function scaleUp(step) { // denormalize
    return {
        open: step.open * openMin,
        high: step.high * highMin,
        low: step.low * lowMin,
        close: step.close * closeMin
    };
}





let openMax = -Infinity;
let openMin = Infinity;
let closeMax = -Infinity;
let closeMin = Infinity;
let lowMin = Infinity;
let lowMax = -Infinity;
let highMax = -Infinity;
let highMin = Infinity;


// Make a request for a user with a given ID
//axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=19&api_key=7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b')
axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=19&api_key=7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b')
    .then(function (response) {
        // handle success
        //console.log(JSON.stringify(response.data.Data.Data[0].time));
        for(let i=0; i<response.data.Data.Data.length;i++)
        {
            //max values
            if (response.data.Data.Data[i].open > openMax)
            {
                openMax = response.data.Data.Data[i].open;
            }
            if (response.data.Data.Data[i].close > closeMax)
            {
                closeMax = response.data.Data.Data[i].close;
            }
            if (response.data.Data.Data[i].low > lowMax)
            {
                lowMax = response.data.Data.Data[i].low;
            }
            if (response.data.Data.Data[i].high > highMax)
            {
                highMax = response.data.Data.Data[i].high;
            }

            //min values
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
                time: timeConverter(response.data.Data.Data[i].time),
                open: response.data.Data.Data[i].open,
                high: response.data.Data.Data[i].high,
                low: response.data.Data.Data[i].low,
                close: response.data.Data.Data[i].close
            }
            trainingData.push(rawdata)

        }
         //console.log(trainingData.length);
        // console.log(trainingData);

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
        // console.log(openMax)
        // console.log(closeMax)
        // console.log(lowMax)
        // console.log(highMax)
        // console.log(openMin)
        // console.log(closeMin)
        // console.log(lowMin)
        // console.log(highMin)
        // for(let y=0;y<trainingData.length;y++)
        // {
        //     trainingData[y]=scaleDown(trainingData[y]);
        // }
        const scaledData = trainingData.map(scaleDown);

        const trainingDatas = [
    scaledData.slice(0, 5),
    scaledData.slice(5, 10),
    scaledData.slice(10, 15),
    scaledData.slice(15, 20),
];

//console.log(trainingData);

const net = new brain.recurrent.LSTMTimeStep({
    //we have open close high and low so its 4 for input and output
    //Hidden layers are the layers that lie between the input and output layer of a neural network.
    inputSize: 4,
    HiddenLayers: [8,8],
    outputSize: 4
});

//iterations of training
net.train(trainingDatas, {
    learningRate: 0.005,
    errorThresh: 0.0000000000002,

    // iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
    // errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
    // log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
    // logPeriod: 10, // iterations between logging out --> number greater than 0
    // learningRate: 0.03, // scales with delta to effect training rate --> number between 0 and 1
    // momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    // callback: null, // a periodic call back that can be triggered while training --> null or function
    // callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    // timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0


    //iterations: 20500,
    //,
   // momentum: 0.08,

    log: (stats) => console.log(stats)
});

// console.log(net.forecast([
//     trainingDatas[0][0],
//     trainingDatas[0][1],
// ], 3).map(scaleUp));

        console.log(net.forecast([
            trainingDatas[0][0],
            trainingDatas[0][1],
        ], 1).map(scaleUp));

// console.log(trainingData[17])
// console.log(trainingData[18])
console.log("match to prediction")
console.log(trainingData[19])
console.log("match to prediction")




    });



