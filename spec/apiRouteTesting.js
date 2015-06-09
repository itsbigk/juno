var chai   = require('chai'),
mongoose   = require('mongoose'),
expect     = chai.expect,
should     = chai.should(),
utils      = require('./utils'),
Restaurant = require('../app/config/db/models/restaurant'),
request = require('supertest');

process.env.NODE_ENV = 'test';

describe('Routing', function() {
  var url = 'localhost:3000';
  describe('Restaurant API', function() {
    var restaurant = null;
    beforeEach(function() {
      restaurant = new Restaurant();
      restaurant.name = "Pepe's Pizza";
      restaurant.description = "Pizza place";
      restaurant.address =  "1 Pizza Way";
      restaurant.cuisine =  "Italian";
      restaurant.website = "www.pepepizza.com";
      restaurant.phone = "839-838-1111";
    });

    it('POST /api/restaurants', function(done) {
      request(url)
      .post('/api/restaurants')
      .send(restaurant)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
    });
  });
});
