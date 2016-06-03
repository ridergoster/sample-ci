var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/contacts', function(req, res, next) {
  res.send([]);
});

console.log('listening on port 8080');
app.listen(8080);

module.exports = app;
