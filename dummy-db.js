var _ = require('underscore');
var fs = require('fs');
var crypto = require('crypto');
var util = require("util");
var events = require("events");

var cards = JSON.parse(fs.readFileSync('./ogw.json', "utf8")).cards;

// SHA1 hash of setCode + cardName + cardImageName

function hash(card) {
  var hash = crypto.createHash('sha1')
    .update("OGW" + card.name + card.imageName)
    .digest('hex');
  return hash;
};

function get(id) {
  return _.findWhere(people, {
    id: id
  });
};

function DummyDB() {
  events.EventEmitter.call(this);
}
util.inherits(DummyDB, events.EventEmitter);

DummyDB.prototype.list = function list(cb) {
  cb(null, cards);
  this.emit('list', cards);
};

DummyDB.prototype.add = function add(card, cb) {
  card.id = id++;
  cards.push(card);
  cb(null, card);
  this.emit('add', card);
};

DummyDB.prototype.get = function get(id, cb) {
  var found = get(id);
  if (found) {
    cb(null, found);
    this.emit('get', found);
  } else {
    cb(404, "Card Not Found")
  }
};

DummyDB.prototype.delete = function remove(id, cb) {
  var found = get(id);
  if (found) cards = _.without(cards, found);
  if (found) {
    cb(null, found);
    this.emit('delete', found);
  } else {
    cb(404, "Card Not Found")
  }
};

DummyDB.prototype.update = function update(person, cb) {
  var found = get(person.id);
  if (found) _.extend(found, person);
  if (found) {
    cb(null, found);
    this.emit('get', found);
  } else {
    cb(404, "Card Not Found")
  }
};
module.exports = new DummyDB();
