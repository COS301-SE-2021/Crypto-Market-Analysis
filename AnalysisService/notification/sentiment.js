const brain = require('brain.js');

const data = require('../TrainingData/AFINN.json');
const fs = require("fs");

const net = new brain.recurrent.LSTM();

const trainingData = [];
Object.keys(data).forEach(function(key) {
    let object = {'input': key , 'output' : data[key]};
    trainingData.push(object)
})
net.train(trainingData, {
     log: (error) => console.log(error),
     iterations: 10
});

 // Save network state to JSON file.
const networkState = net.toJSON();
fs.writeFileSync("network_state.json",  JSON.stringify(networkState), "utf-8");