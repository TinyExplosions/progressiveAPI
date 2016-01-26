var express = require('express');
var path = require('path');
var port = 3000;
var host = '0.0.0.0';
var compression = require('compression');

var app = express();
app.use(compression())

app.use('/cards', require('./simpleAPI.js')());
app.use('/artwork', require('./simpleProxy.js')());

var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
