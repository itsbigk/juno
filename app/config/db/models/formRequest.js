var mongoose = require('mongoose');

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
    type : Number,
    required : false
  },
  foodPreferences   : [{
    name: {type: String},
    selected: {type: Boolean},
    value: {type: String},
    required: false
  }]
                //   glutenFree: { type: Boolean },
                //   peanutAllergy: { type: Boolean },
                //   vegan: { type: Boolean },
                //   vegetarian: { type: Boolean },
                //   pescatarian: { type: Boolean },
                //   other: {type: String },
                //   required: false
                // },
});

module.exports = mongoose.model('FormRequest', FormRequestSchema);
