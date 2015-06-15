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
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        request.delete(restaurantsURL + res.body.restaurant_id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });

    it('should not create duplicate restaurant', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        var firstRestaurantId = res.body.restaurant_id;
        expect(err).to.be.null;
        request
        .post(restaurantsURL)
        .send(restaurant)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(400);
          request.delete(restaurantsURL + firstRestaurantId)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
          });
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
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        var restaurantId = res.body.restaurant_id;
        request
        .put(restaurantsURL + restaurantId)
        .send(restaurantTwo)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          request.delete(restaurantsURL + restaurantId)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
          });
        });
      });
    });

    it('should not update a restaurant if another has the same street', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        var firstRestaurantId = res.body.restaurant_id;
        expect(res.statusCode).to.equal(200);
        request
        .post(restaurantsURL)
        .send(restaurantTwo)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          var secondRestaurantId = res.body.restaurant_id;
          restaurantTwo.street = "8 Pizza Way";
          request
          .put(restaurantsURL + secondRestaurantId)
          .send(restaurantTwo)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(400);
            request
            .delete(restaurantsURL + firstRestaurantId)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              request.delete(restaurantsURL + secondRestaurantId)
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                done();
              });
            });
          });
        });
      });
    });

  });

  describe('Testing GET /api/restaurants/ and GET /api/restaurants/:restaurant_id', function() {
    var restaurant = null;
    before(function() {
      restaurant = new Restaurant();
      restaurant.name = "Pepe's Pizza";
      restaurant.cuisine =  "Italian";
      restaurant.website = "www.pepepizza.com";
      restaurant.phone = "839-838-1111";
      restaurant.street =  "8 Pizza Way";
      restaurant.state =  "California";
      restaurant.city =  "Los Angeles";
      restaurant.zip =  90045;
    });

    it('should GET all restaurants successfully', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        var restaurant_id = res.body.restaurant_id;
        request
        .get(restaurantsURL)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          request.delete(restaurantsURL + restaurant_id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
          });
        });
      });
    });

    it('should GET a single existing restaurant successfully', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        var restaurant_id = res.body.restaurant_id;
        request
        .get(restaurantsURL + restaurant_id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          request
          .delete(restaurantsURL + restaurant_id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
          });
        });      
      });
    });

    it('should return 404 if trying to get restaurant that does not exist', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        var restaurant_id = res.body.restaurant_id;
        request
        .delete(restaurantsURL + restaurant_id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          request
          .get(restaurantsURL + restaurant_id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(404);
            done();
          });      
        });
      });
    });
  });

  describe('Testing DEL /api/restaurants/:restaurant_id', function() {
    var restaurant = null;
    before(function() {
      restaurant = new Restaurant();
      restaurant.name = "Pepe's Pizza";
      restaurant.cuisine =  "Italian";
      restaurant.website = "www.pepepizza.com";
      restaurant.phone = "839-838-1111";
      restaurant.street =  "8 Pizza Way";
      restaurant.state =  "California";
      restaurant.city =  "Los Angeles";
      restaurant.zip =  90045;
    });

    it('should delete an existing restaurant successfully', function(done) {
      request
      .post(restaurantsURL)
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        request.delete(restaurantsURL + res.body.restaurant_id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });

    it('should return 404 if trying to delete a restaurant that does not exist', function(done) {
      request
      .delete(restaurantsURL + restaurant._id)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });
});
