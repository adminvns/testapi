const app  = require('./app');
const http = require('http');
const port = 5000;
const server = http.createServer(app);
console.log('Server is running on port ' + port);
server.listen(port);