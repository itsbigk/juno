var mongoose     = require('mongoose'),

RestaurantSchema = mongoose.model('Restaurant', {
  name        :  {
                  type     : String,
                  required : true
                 },
  description :  {
                  type     : String,
                  required : true
                 },
  cuisine     :  {
                    type     : String,
                    required : true,
                 },
  address     :  {
                  type     : String,
                  required : true,
                  index    : {
                              unique : true
                             }
                  },
  website     :  {
                  type : String,
                  required : false
                },
  phone       :  {
                  type : String,
                  required : false
                 }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
