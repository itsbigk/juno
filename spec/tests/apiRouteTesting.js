var chai   = require('chai'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../../app/config/db/models/restaurant'),
request = require('supertest');

describe('Routing', function() {
  request = request('localhost:3000');
  var restaurantsURL = '/api/restaurants/';

  describe('Testing POST /api/restaurants/', function() {
    var restaurant = null;
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
      .post(restaurantsURL)
      .send(restaurant)
      .expect(200)
      .end(function(err, res) {
        request.delete(restaurantsURL + res.body.restaurant_id).expect(200, done);
      });
    });

    it('should not create duplicate restaurant', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .expect(200)
      .end(function(err, res) {
        var firstRestaurantId = res.body.restaurant_id;
        expect(err).to.be.null;
        request
        .post(restaurantsURL)
        .send(restaurant)
        .expect(400)
        .end(function(err, res) {
          request.delete(restaurantsURL + firstRestaurantId).expect(200, done);
        });
      });
    });
  });

  describe('Testing PUT /api/restaurants/', function() {
    var restaurant = null;
    var restaurantTwo = null;
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

      restaurantTwo = new Restaurant();
      restaurantTwo.name = "Jane's Diner";
      restaurantTwo.description = "Classic diner";
      restaurantTwo.cuisine =  "American";
      restaurantTwo.website = "www.janediner.com";
      restaurantTwo.phone = "424-777-1011";
      restaurantTwo.street =  "5 Greasy Drive";
      restaurantTwo.state = "California";
      restaurantTwo.city =  "San Francisco";
      restaurantTwo.zip =  94143;
    });

    it('should update restaurant successfully', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .expect(200)
      .end(function(err, res) {
        var restaurantId = res.body.restaurant_id;
        request
        .put(restaurantsURL + restaurantId)
        .send(restaurantTwo)
        .expect(200)
        .end(function(err, res) {
          request.delete(restaurantsURL + restaurantId).expect(200, done);
        });
      });
    });

    it('should not update a restaurant if another has the same street', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .expect(200)
      .end(function(err, res) {
        var firstRestaurantId = res.body.restaurant_id;
        request
        .post(restaurantsURL)
        .send(restaurantTwo)
        .expect(200)
        .end(function(err, res) {
          var secondRestaurantId = res.body.restaurant_id;
          restaurantTwo.street = "8 Pizza Way";
          request
          .put(restaurantsURL + secondRestaurantId)
          .send(restaurantTwo)
          .expect(400)
          .end(function(err, res) {
            request
            .delete(restaurantsURL + firstRestaurantId)
            .expect(200)
            .end(function(err, res) {
              request.delete(restaurantsURL + secondRestaurantId).expect(200, done);
            });
          });
        });
      });
    });

  });

});
