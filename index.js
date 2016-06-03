var express = require('express');
var bodyparser = require('body-parser');
var _ = require('lodash');
var app = express();

var contacts = [];

app.use(express.static('public'));

app.get('/api/contacts', function(req, res, next) {
  res.send(contacts);
});

app.get('/api/contacts/:name', function(req, res, next) {
  res.send(contacts);
});

app.post('/api/contacts', bodyparser.json(), function(req, res, next) {
  var contact = req.body.contact;
  contacts.push(contact);
  res.send(contacts);
});

app.put('/api/contacts/:name/:new', function(req, res, next) {
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

app.delete('/api/contacts/:name', function(req, res, next) {
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

var port = process.env.PORT || 3000;
console.log('listening on port' + port);
app.listen(port);

module.exports = app;
