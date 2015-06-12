var chai   = require('chai'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../../app/config/db/models/restaurant'),
request = require('supertest');

describe('Routing', function() {
  request = request('localhost:3000');

  describe('POST /api/restaurants', function() {
    var restaurant = null;
    var restaurandId = null;
    before(function() {
      restaurant = new Restaurant();
      restaurant.name = "Pepe's Pizza";
      restaurant.description = "Pizza place";
      restaurant.cuisine =  "Italian";
      restaurant.website = "www.pepepizza.com";
      restaurant.phone = "839-838-1111";
      restaurant.street =  "8 Pizza Way";
      restaurant.state =  "California";
      restaurant.city =  "Los Angeles";
      restaurant.zip =  90045;
    });

    it('should create restaurant successfully', function(done) {
      request
      .post('/api/restaurants')
      .send(restaurant)
      .expect(200)
      .end(function(err, res) {
        request
        .delete('/api/restaurants/' + res.body.restaurant_id)
        .end(function(err, res) {
          done();
        });
      });
    });

    it('should not create duplicate restaurant', function(done) {
      request
      .post('/api/restaurants')
      .send(restaurant)
      .end(function(err, res) {
        var firstRestaurantId = res.body.restaurant_id;
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        request
        .post('/api/restaurants')
        .send(restaurant)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(400);
          request
          .delete('/api/restaurants/' + firstRestaurantId)
          .end(function(err, res) {
            done();
          });
        });
      });
    });

  });

});
