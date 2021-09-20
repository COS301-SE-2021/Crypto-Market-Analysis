require("dotenv").config();
const http = require('http');
const app = require('./app');
const analysis = require("./analysisFunction");
let port = process.env.PORT || 3443
http.createServer(app);
app.listen(port, () => console.log('Secure server running on port '+port));
const array_of_crypto =analysis.get_Doc_id('Reddit');
console.log(array_of_crypto)