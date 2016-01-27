var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var tokenHandler = require(__dirname + '/jwtHandler');

function authRoutes() {
  var app = new express.Router();
  app.use(cors());
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json());

  // curl -X POST -d 'email=something' "http://localhost:3000/auth/login"
  app.post('/login', function(req, res) {
    console.log(req.body);
    if (!req.body.email) {
      res.status = 400;
      return res.send('invalid params');
    }
    var token = tokenHandler.create(req.body.email);
    res.send(token);
  });

  return app;

}

module.exports = authRoutes;
