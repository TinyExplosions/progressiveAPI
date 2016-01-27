var express = require('express');
var path = require('path');
var port = 3000;
var host = '0.0.0.0';
var compression = require('compression');
var tokenHandler = require('./jwtHandler.js');


var app = express();
app.use(compression())

app.use('/auth', require('./dummy-auth.js')());
app.use('/cards', require('./simpleAPI.js')());
app.use('/artwork', require('./simpleProxy.js')());
app.use('/partials', require('./simplePartialAPI.js')());

// Anything after this is secret unless access_token header is a valit JWT
app.use(tokenHandler.parseToken);

var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
