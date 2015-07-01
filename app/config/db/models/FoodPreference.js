var mongoose = require('mongoose');

var FoodPreferenceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FoodPreference', FoodPreferenceSchema);
