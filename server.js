const app  = require('./app');
const http = require('http');
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const url = `http://localhost:${port}`;
console.log('Server is running on port ' + port);
console.log('Open in browser: ' + url);

server.listen(port);