var mongoose     = require('mongoose'),

RestaurantSchema = mongoose.model('Restaurant', {
  name        :  {
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
  street      :  {
                  type     : String,
                  required : true
                 },
  state       :  {
                  type     : String,
                  required : true
                 },
  city        :  {
                  type     : String,
                  required : true
                 },
  zip         :  {
                  type     : Number,
                  required : true,
                  message: "Must be a number"
                 },
  website     :  {
                  type : String,
                  required : false
                 },
  phone       :  {
                  type : String,
                  required : false
                 },
  email       :  {
                  type     : String,
                  required : false
                 },
  archived    :  {
                  type     : Boolean,
                  required : false
                 },
  archiveDate :  {
                  type: String,
                  required: false
                 },
  menuItems   : [{
                  name: { type: String, required: false },
                  price: { type: Number, required: false },
                  description: { type: String, required: false },
                  imageUrl: { type: String, required: false },
                  required: false
                }],
  imageUrl    : {
                  type : String,
                  required : false
                }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
