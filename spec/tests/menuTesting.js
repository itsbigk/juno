var chai   = require('chai'),
mongoose   = require('mongoose'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../../app/config/db/models/restaurant'),
utils      = require('../utils');

describe('testing crud functionality for menuItems', function() {
  var restaurant = null;

  beforeEach(function(done) {
    Restaurant.collection.dropAllIndexes(function(err, results) {
      done();
    });
    restaurant = new Restaurant({ menuItems: [{name: "Pepperoni Pizza", price: "12.99", description: "Cheese and pepperoni pieces", imageURL: "peppizza"},
      {name: "Cheese Pizza", price: "9.99", description: "Cheese", imageURL: "cheesepizza"}] });
    restaurant.name = "Pepe's Pizza";
    restaurant.street =  "1 Pizza Way";
    restaurant.state =  "California";
    restaurant.city =  "Los Angeles";
    restaurant.email =  "pepe@pepepizza.com";
    restaurant.zip =  90045;
    restaurant.cuisine =  "Italian";
    restaurant.website = "www.pepepizza.com";
    restaurant.phone = "839-838-1111";
    restaurant.address = restaurant.street + ' ' + restaurant.city + ', ' + restaurant.state + ' ' + restaurant.zip;
  });

  it('should create a new record of a restaurant with all of the correct menu fields', function(done) {
    restaurant.save(function(err, obj) {
      expect(err).to.be.null;
      expect(obj.name).to.be.a('string').and.equal("Pepe's Pizza");
      expect(obj.street).to.be.a('string').and.equal("1 Pizza Way");
      expect(obj.state).to.be.a('string').and.equal("California");
      expect(obj.city).to.be.a('string').and.equal("Los Angeles");
      expect(obj.email).to.be.a('string').and.equal("pepe@pepepizza.com");
      expect(obj.zip).to.be.a('number').and.equal(90045);
      expect(obj.cuisine).to.be.a('string').and.equal("Italian");
      expect(obj.website).to.be.a('string').and.equal("www.pepepizza.com");
      expect(obj.phone).to.be.a('string').and.equal("839-838-1111");
      expect(obj.address).to.be.a('string').and.equal("1 Pizza Way Los Angeles, California 90045");
      expect(obj.menuItems[0].name).to.be.a('string').and.equal("Pepperoni Pizza");
      expect(obj.menuItems[0].price).to.be.a('number').and.equal(12.99);
      expect(obj.menuItems[0].description).to.be.a('string').and.equal("Cheese and pepperoni pieces");
      expect(obj.menuItems[0].imageURL).to.be.a('string').and.equal("peppizza");
      expect(obj.menuItems[1].name).to.be.a('string').and.equal("Cheese Pizza");
      expect(obj.menuItems[1].price).to.be.a('number').and.equal(9.99);
      expect(obj.menuItems[1].description).to.be.a('string').and.equal("Cheese");
      expect(obj.menuItems[1].imageURL).to.be.a('string').and.equal("cheesepizza");
      done();
    });
  });

  it('should have an error when trying to create a restaurant with a menu item without a name field', function(done) {
    restaurant.menuItems[1].name = null;
    restaurant.save(function(err, obj) {
      expect(err.name).to.equal('ValidationError');
      done();
    });
  });

});
