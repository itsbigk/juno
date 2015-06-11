var chai   = require('chai'),
expect     = chai.expect,
should     = chai.should(),
Restaurant = require('../../app/config/db/models/restaurant'),
request = require('supertest'),
app = require('../../server');

describe('Routing', function() {
  var url = 'localhost:3000';
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
      restaurant.suite =  135;
      restaurant.zip =  90045;
    });


    it('POST /api/restaurants', function(done) {
      request(app)
      .post('/api/restaurants')
      .send(restaurant)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    // it('should create restaurant successfully', function(done) {
    //   request(url)
    //   .post('/api/restaurants')
    //   .send(restaurant)
    //   .expect(200)
    //   .end(function(err, res) {
    //     console.log(res.body);
    //     request(url)
    //     .delete('/api/restaurants/' + restaurant._id)
    //     .end(function(err, res) {
    //       console.log(res.body);
    //       done();
    //     });
    //   });
    // });
  });

  // describe('POST duplicate to /api/restaurants', function() {
  //   var restaurant = null;
  //   before(function() {
  //     restaurant = new Restaurant();
  //     restaurant.name = "Pepe's Pizza";
  //     restaurant.description = "Pizza place";
  //     restaurant.cuisine =  "Italian";
  //     restaurant.website = "www.pepepizza.com";
  //     restaurant.phone = "839-838-1111";
  //   });

  //   it('should not create duplicate restaurant', function(done) {
  //     request(url)
  //     .post('/api/restaurants')
  //     .send(restaurant)
  //     .end(function(err, res) {
  //       console.log("FIRST CALLBACK" + res);
  //       expect(err).to.be.null;
  //       expect(res.statusCode).to.equal(200);
  //       request(url)
  //       .post('/api/restaurants')
  //       .send(restaurant)
  //       .end(function(err, res) {
  //         console.log("SECOND CALLBACK" + res.statusCode);
  //         expect(err).to.be.null;
  //         done();
  //       });
  //     });
  //   });
  // });
});
