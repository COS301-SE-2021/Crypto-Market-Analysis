const brain = require('brain.js');
const fs = require("fs");

let neural_network = new brain.recurrent.LSTM();

const Trained_Model = JSON.parse(fs.readFileSync("network_state.json", "utf-8"));
neural_network.fromJSON(Trained_Model);

console.log(neural_network.run('i love sugar people'));