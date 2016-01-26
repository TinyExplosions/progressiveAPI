var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var proxyRoot =
  "http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=";

function proxyRoutes() {
  var app = new express.Router();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/:id', function(req, res) {
    request(proxyRoot + req.params.id).pipe(res);
  });

  return app;

}

module.exports = proxyRoutes;
