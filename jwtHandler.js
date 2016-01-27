var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var supersecretkey = 'someawesomesecret';

function jwtHandler() {
  var handler = {};

  handler.create = function(user) {
    var token = jwt.sign({
      user: 'bar'
    }, supersecretkey);
    return token;
  }

  handler.parseToken = function(req, res, next) {
    jwt.verify(req.headers['access_token'], supersecretkey, function(err,
      decoded) {
      if (!err) {
        req.user = decoded;
        return next();
      } else {
        res.status = 401;
        res.send("Unauthorised");
      }
    });
  }


  return handler;

}

module.exports = jwtHandler();
