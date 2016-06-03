var express = require('express');
var bodyparser = require('body-parser');
var _ = require('lodash');
var app = express();
var mongoose = require('mongoose');

var dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/kontack";
mongoose.connect(dbUri);
var Contact = mongoose.model('Contact',
  mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })
);
var contacts = [];

app.use(express.static('public'));

app.get('/contacts', function(req, res, next) {
  Contact.find(function(err, contacts) {
    res.send(contacts);
  });
});

app.get('/contacts/:name', function(req, res, next) {
  Contact.find({name: req.params.name}, function(err, contacts) {
    res.send(contacts);
  });
});

app.post('/contacts', bodyparser.json(), function(req, res, next) {
  var contact = new Contact(req.body.contact);
  contact.save(function(err, contacts) {
    res.send(contact);
  });
});

app.put('/contacts/:name/:new', function(req, res, next) {
  Contact.update({
    name: req.params.name,
    $set: {
      name: req.params.new
    }
  }, function(err, data) {
    res.send(data);
  });
});

var port = process.env.PORT || 3000;
console.log('listening on port' + port);
app.listen(port);

module.exports = app;
