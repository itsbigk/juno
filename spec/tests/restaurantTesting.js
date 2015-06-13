var chai   = require('chai'),
mongoose   = require('mongoose'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../../app/config/db/models/restaurant'),
utils      = require('../utils');

process.env.NODE_ENV = 'test';

describe('testing crud functionality for restaurants', function() {
  var restaurant = null;

  beforeEach(function(done) {
    Restaurant.collection.dropAllIndexes(function(err, results) {
      done();
    });
    restaurant = new Restaurant();
    restaurant.name = "Pepe's Pizza";
    restaurant.street =  "1 Pizza Way";
    restaurant.state =  "California";
    restaurant.city =  "Los Angeles";
    restaurant.email =  "pepe@pepepizza.com";
    restaurant.zip =  90045;
    restaurant.cuisine =  "Italian";
    restaurant.website = "www.pepepizza.com";
    restaurant.phone = "839-838-1111";
  });

  it('should create a new record of a restaurant with all of the correct fields', function(done) {
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
      done();
    });
  });


  it('should get the restaurant that was created', function(done) {
    restaurant.save(function(err, obj) {
      expect(err).to.be.null;
      Restaurant.findById(restaurant._id, function(err, obj) {
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
        done();
      });
    });

  });

  it('should update a restaurant with the correct fields', function(done) {
    restaurant.save(function(err, obj) {
      expect(err).to.be.null;
      Restaurant.findById(restaurant._id, function(err, obj) {
        expect(err).to.be.null;
        restaurant.name = "Juno Burgers";
        restaurant.street =  "123 Main St";
        restaurant.state =  "California";
        restaurant.city =  "Redondo Beach";
        restaurant.email =  "pepe@pepepizza.com";
        restaurant.zip =  90277;
        restaurant.cuisine =  "Burgers";
        restaurant.website = "www.junoburgers.com";
        restaurant.phone = "239-655-7277";
        restaurant.save(function(err,obj) {
          expect(err).to.be.null;
          expect(obj.name).to.be.a('string').and.equal("Juno Burgers");
          expect(obj.street).to.be.a('string').and.equal("123 Main St");
          expect(obj.state).to.be.a('string').and.equal("California");
          expect(obj.city).to.be.a('string').and.equal("Redondo Beach");
          expect(obj.email).to.be.a('string').and.equal("pepe@pepepizza.com");
          expect(obj.zip).to.be.a('number').and.equal(90277);
          expect(obj.cuisine).to.be.a('string').and.equal("Burgers");
          expect(obj.website).to.be.a('string').and.equal("www.junoburgers.com");
          expect(obj.phone).to.be.a('string').and.equal("239-655-7277");
          done();
        });
      });
    });

  });

  it('should delete the restaurant', function(done) {
    restaurant.save(function(err, obj) {
      expect(err).to.be.null;
      restaurant.remove(restaurant._id, function(err, obj) {
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
        done();
      });
    });
  });



});
