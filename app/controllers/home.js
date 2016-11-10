var mongoose = require('mongoose');
var Instrument = mongoose.model('Instrument');
module.exports = {
  init: function(req, res) {
    return res.render("index.ejs");
  },
  getEntries: function(req, res) {
    var instrument_id = req.params['instrument_id'];
    var where = {};
    if (instrument_id) {
      where['instrument_id'] = instrument_id
    }
    var query = Instrument.find(where).lean();
    query.exec(function(err, data) {
      if (err) {
        res.status(500);
        return res.json({
          errors: "Internal Server Error"
        });
      }
      return res.json({
        message: data
      });
    });
  }
}
