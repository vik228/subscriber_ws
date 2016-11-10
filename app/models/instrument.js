// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InstrumentSchema = new Schema({
  instrument_id: {
    type: Number
  },
  position: {
    type: Number
  }
});
module.exports = mongoose.model('Instrument', InstrumentSchema);
