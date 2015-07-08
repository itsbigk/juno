var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormRequestSchema = mongoose.model('FormRequest', {
  zipcode: {
    type     : String,
    required : true
  },
  email: {
    type     : String,
    required : true
  },
  craving: {
    type     : String,
    required : true
  },
  budget: {
    type : String,
    required : true
  },
  otherPreference: {
    type: String,
    required: false
  },
  created: {
    type : Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  foodPreferences   : [{
    type: Schema.Types.ObjectId,
    ref: 'FoodPreference'
  }]
});

module.exports = mongoose.model('FormRequest', FormRequestSchema);
