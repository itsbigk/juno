var mongoose = require('mongoose');

var FoodPreferencesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FoodPreferences', FoodPreferencesSchema);
