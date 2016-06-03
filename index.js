var express = require('express');
var bodyparser = require('body-parser');
var _ = require('lodash');
var app = express();

var contacts = [];

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/contacts', function(req, res, next) {
  res.send(contacts);
});

app.get('/contacts/:name', function(req, res, next) {
  res.send(contacts);
});

app.post('/contacts', bodyparser.json(), function(req, res, next) {
  var contact = req.body.contact;
  contacts.push(contact);
  res.send(contacts);
});

app.put('/contacts/:name/:new', function(req, res, next) {
  var count = 0;
  contacts.map(function(contact) {
    if(contact.name == req.params.name) {
      count++;
      contact.name = req.params.new;
    }
    return contact;
  });
  res.send({count: count});
});

app.delete('/contacts/:name', function(req, res, next) {
  var count = 0;
  _.remove(contacts, function(contact) {
    if(contact.name !== req.params.name) {
      return false;
    }
    count++;
    return true;
  });
  res.send({count: count});
});

console.log('listening on port 8080');
app.listen(8080);

module.exports = app;
