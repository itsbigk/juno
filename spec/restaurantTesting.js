var chai   = require('chai'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../app/config/db/models/restaurant');


describe('testing crud functionality for restaurants', function() {

  it('should create a new record of a restaurant with all of the correct fields', function(done) {
    var restaurant = new Restaurant();


    restaurant.name = "Pepe's Pizza";
    restaurant.description = "Pizza place";
    restaurant.address =  "1 Pizza Way";
    restaurant.cuisine =  "Italian";
    restaurant.website = "www.pepepizza.com";
    restaurant.phone = "839-838-1111";

    restaurant.save(function(err, obj) {
      expect(obj.name).to.be.a('string').and.equal("Pepe's Pizza");
    });
    done();
  });

});
