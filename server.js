var express = require('express');
var path = require('path');
var port = 3000;
var host = '0.0.0.0';

var app = express();

var db = require(__dirname + '/dummy-db');
db.on('list', function() {
  console.log('db fired a list event');
});

db.list(function(err, resp) {
  console.log(resp);
});


var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
