'use strict';

var mongoose = require('mongoose');
var config = require('./config');

var db = process.env.testDomain || config.db.development;
mongoose.connect(db);

var foodPreferenceSeed = require('./app/config/db/seed/foodPreferenceSeed');

foodPreferenceSeed.drop()
  .then(foodPreferenceSeed.seed)
  .then(function() {
    process.exit();
  });
