var path    = require('path'),
Restaurant  = require('../config/db/models/restaurant.js');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  // middleware to use for all requests
  apiRouter.use(function(req, res, next) {
    // this is where we will authenticate users
    next();
  });

  apiRouter.route('/restaurants')

    // get all the restaurants
    .get(function(req, res) {
      Restaurant.find(function(err, restaurants) {
        if (err) res.status(404).send(err);

        // return the restaurants
        res.json(restaurants);
      });
    })

    // create a restaurant
    .post(function(req, res) {

      // create a new instance of the Restaurant model
      var restaurant = new Restaurant();

      // set the restaurant information (comes from the request)
      restaurant.name = req.body.name;
      restaurant.cuisine = req.body.cuisine;
      restaurant.street = req.body.street;
      restaurant.state = req.body.state;
      restaurant.city = req.body.city;
      restaurant.zip = req.body.zip;
      restaurant.website = req.body.website;
      restaurant.phone = req.body.phone;
      restaurant.email = req.body.email;
      restaurant.archived = false;

      // save the restaurant and check for errors
      restaurant.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.status(400).send({ success: false, message: 'Restaurant street already exists.', restaurant_id: restaurant._id});
          else
            return res.send(err);
        }
        res.json({ message: 'Restaurant created!', restaurant_id: restaurant._id });
      })

    });

  apiRouter.route('/restaurants/:restaurant_id')

    // get the restaurant with that id
    .get(function(req, res) {
      Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) return res.status(404).send(err);
        if (restaurant === null) return res.status(404).send(err);
        //return that restaurant
        return res.json(restaurant);
      });
    })

    // update the restaurant with this id
    .put(function(req, res) {
      // use our restaurant model to find the restaurant we want
      Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) res.status(404).send(err);
        if (restaurant === null) return res.status(404).send(err);

        // update the restaurant's info only if it's new
        if (req.body.name != restaurant.name) restaurant.name = req.body.name;
        if (req.body.street != restaurant.street) restaurant.street = req.body.street;
        if (req.body.city != restaurant.city) restaurant.city = req.body.city;
        if (req.body.state != restaurant.state) restaurant.state = req.body.state;
        if (req.body.zip != restaurant.zip) restaurant.zip = req.body.zip;
        if (req.body.cuisine != restaurant.cuisine) restaurant.cuisine = req.body.cuisine;
        if (req.body.website != restaurant.website) restaurant.website = req.body.website;
        if (req.body.phone != restaurant.phone) restaurant.phone = req.body.phone;
        if (req.body.email != restaurant.email) restaurant.email = req.body.email;
        if (req.body.archived) restaurant.archived = req.body.archived;

        // save the restaurant
        restaurant.save(function(err) {
          if (err) res.status(400).send({ success: false, message: 'Restaurant validation failed.'});

          // return a message
          res.json({ message: 'Restaurant updated!' });
        });
      });
    })

    .delete(function(req, res) {
      Restaurant.remove({
        _id: req.params.restaurant_id
      }, function(err, restaurant) {
        if (err) return res.status(404).send(err);
        if (restaurant.result.n === 0) return res.status(404).send(err);
        res.json({ message: 'Restaurant deleted!' });

        Restaurant.find(function(err, restaurants) {
          if (err) res.send(err);

          // return the restaurants after removing one
          res.json({ restaurants: restaurants });
        });
      });
    });



  app.use('/api', apiRouter);

  app.get('/', function(req, res) {
    res.sendFile('index');
  });

  app.get('*', function(req, res) {
    res.redirect('/');
  });

}
