var chai   = require('chai'),
mongoose   = require('mongoose'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../app/config/db/models/restaurant'),
utils      = require('./utils');

process.env.NODE_ENV = 'test';

describe('testing crud functionality for restaurants', function() {
  it('should create a new record of a restaurant with all of the correct fields', function(done) {
    var restaurant = new Restaurant();
    var restaurantId = restaurant._id;
    restaurant.name = "Pepe's Pizza";
    restaurant.description = "Pizza place";
    restaurant.address =  "1 Pizza Way";
    restaurant.cuisine =  "Italian";
    restaurant.website = "www.pepepizza.com";
    restaurant.phone = "839-838-1111";
    restaurant.save(function(err, obj) {
      expect(obj.name).to.be.a('string').and.equal("Pepe's Pizza");
      expect(obj.description).to.be.a('string').and.equal("Pizza place");
      expect(obj.address).to.be.a('string').and.equal("1 Pizza Way");
      expect(obj.cuisine).to.be.a('string').and.equal("Italian");
      expect(obj.website).to.be.a('string').and.equal("www.pepepizza.com");
      expect(obj.phone).to.be.a('string').and.equal("839-838-1111");
      done();
    });
  });


  it('should get the restaurant that was created', function(done) {
    var restaurant = new Restaurant();
    var restaurantId = restaurant._id;
    restaurant.name = "Pepe's Pizza";
    restaurant.description = "Pizza place";
    restaurant.address =  "1 Pizza Way";
    restaurant.cuisine =  "Italian";
    restaurant.website = "www.pepepizza.com";
    restaurant.phone = "839-838-1111";
    restaurant.save(function(err, obj) {
      Restaurant.findById(restaurantId, function(err, obj) {
        expect(obj.name).to.be.a('string').and.equal("Pepe's Pizza");
        expect(obj.description).to.be.a('string').and.equal("Pizza place");
        expect(obj.address).to.be.a('string').and.equal("1 Pizza Way");
        expect(obj.cuisine).to.be.a('string').and.equal("Italian");
        expect(obj.website).to.be.a('string').and.equal("www.pepepizza.com");
        expect(obj.phone).to.be.a('string').and.equal("839-838-1111");
        done();
      })
    });
    
  });



});
