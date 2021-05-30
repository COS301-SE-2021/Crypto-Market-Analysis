const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port || 5000;
console.log(`Listening on port ${port}`)
const server = http.createServer(app);

server.listen(port);