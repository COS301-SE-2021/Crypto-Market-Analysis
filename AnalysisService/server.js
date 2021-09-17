require("dotenv").config();
const http = require('http');
const app = require('./app');
let port = process.env.PORT || 3443
http.createServer(app);
app.listen(port, () => console.log('Secure server running on port '+port));
