var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
module.exports = function (app) {
  app.use('/', router);
};
router.get('/', controllers['home']['init']);
router.get('/execution_order', controllers['home']['getEntries']);
router.get('/execution_order/:instrument_id', controllers['home']['getEntries']);
