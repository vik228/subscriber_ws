var mongoose = require('mongoose');
var Instrument = mongoose.model('Instrument');
var q = require('q');
var getValues = function(data) {
  var values = {};
  var splitData = data.split(":");
  var executionOrder = splitData[1].split("|");
  for (var i = 0; i < executionOrder.length; i++) {
    var str = executionOrder[i].split("=");
    if (str[0] === "48") {
      values['id'] = str[1];
    }else if (str[0] === "32") {
      values['qty'] = str[1];
    }else if (str[0] === "54") {
      values['action_id'] = str[1];
    }
  }
  return values;
}
var updatePosition = function (actionId, result,qty,defer) {
  //console.log (actionId,result['position'],qty);
  if (actionId == 1) {
    result['position'] += qty * 1;
  } else {
    result['position'] -= qty * 1;
  }
  result.save(function(err) {
    if (err) {
      defer.reject(err);
    } else {
      console.log (result['instrument_id'], "updated");
      defer.resolve("updated");
    }
  });
}
var addPosition = function (actionId,qty,id,defer) {
  //console.log (actionId,qty,id);
  var position = -1;
  if (actionId == 1) {
    position = qty * 1;
  } else {
    position = qty * -1;
  }
  var instrumentData = new Instrument({
    instrument_id: id * 1,
    position: position
  });
  var promise = instrumentData.save();
  promise.then (function (savedInstrument){
    console.log(id, "inserted");
    defer.resolve("inserted");
  });
  promise.catch (function (err){
    defer.reject(err);

  });
}
module.exports = {
  insertOrUpdate: function(data) {
    var defer = q.defer();
    var values = getValues(data);
    if (!values['action_id'] || !values['id'] || !values['qty']) {
      defer.reject("error");
      return;
    }
    console.log (values);
    var query = Instrument.findOne({
      instrument_id: values['id']*1
    });
    query.exec(function(err, result) {
      if (result) {
        updatePosition(values['action_id'], result,values['qty'],defer);
      } else {
        addPosition(values['action_id'],values['qty'],values['id'],defer);
      }
    });
    return defer.promise;
  }
}
