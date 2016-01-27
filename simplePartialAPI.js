var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cons = require('consolidate');
var path = require('path');
var db = require(__dirname + '/dummy-db');

function apiRoutes() {
  var app = new express();

  app.engine('html', cons.underscore);
  app.set('views', path.join(__dirname, 'partials'));
  app.set('view engine', 'html');
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    db.list(function(err, items) {
      return res.render('cardList', {
        cards: items
      });
    });
  });

  app.get('/:id', function(req, res) {
    db.get(req.params.id, function(err, item) {
      if (err) {
        res.status(err);
        return res.send(item);
      } else {
        return res.render('card', item);
      }
    });
  });

  app.put('/:id', function(req, res) {
    db.update(req.body, function(err, item) {
      if (err) {
        res.status(err);
        return res.send(item);
      } else {
        return res.send(item);
      }
    });
  });

  app.delete('/:id', function(req, res) {
    db.delete(req.params.id, function(err, item) {
      if (err) {
        res.status(err);
        return res.send(item);
      } else {
        return res.send(item);
      }
    });
  });



  return app;

}

module.exports = apiRoutes;
