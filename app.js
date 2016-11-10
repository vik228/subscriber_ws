var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mqtt = require('mqtt'),
  mongoose = require('mongoose');
var insertInitiated = false;
var allRecords = [];
var init = function(callback) {
  var helpers = require('./app/helpers');
  (function addOrUpdate() {
    console.log ("total length",allRecords.length);
    var cloneData = allRecords.splice(0, 1)[0];
    console.log ("sending",cloneData);
    var insertOrUpdatePromise = helpers['DBHelper'].insertOrUpdate(cloneData);
    insertOrUpdatePromise.then(function(result) {
      if (allRecords.length > 0) {
        setTimeout(addOrUpdate, 0);
      } else {
        insertInitiated = false;
      }
    });
    insertOrUpdatePromise.catch(function(err) {
      if (allRecords.length > 0) {
        setTimeout(addOrUpdate, 0);
      } else {
        insertInitiated = false;
      }
    });
  })();
}
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
  require(model);
});
var app = express();
require('./config/express')(app, config);
app.listen(config.port, function() {
  var client = mqtt.connect('mqtt://localhost:1883')
  client.on('connect', function() {
    client.subscribe('execution_order')
  });
  client.on('message', function(topic, message) {
    if (topic === "execution_order") {
      allRecords.push(message.toString());
      if (!insertInitiated) {
        init();
        insertInitiated = true;
      }
    }
  });
});
