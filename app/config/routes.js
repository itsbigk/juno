var path = require('path');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  // middleware to use for all requests
  apiRouter.use(function(req, res, next) {
    console.log('Somebody just came to our app!');
    // this is where we will authenticate users

    next();
  });

 

  apiRouter.route('/restaurants')

    // get all the restaurants
    .get(function(req, res) {
      Restaurant.find(function(err, restaurants) {
        if (err) res.send(err);

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
      restaurant.description = req.body.description;
      restaurant.address = req.body.address;
      restaurant.website = req.body.website;
      restaurant.phone = req.body.phone;

      // save the restaurant and check for errors
      restaurant.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, messages: 'A restaurant with that address already exists. '});
          else
            return res.send(err);
        }
        res.json({ message: 'Restaurant created!' });
      })
      
    });

  apiRouter.route('/restaurants/:restaurant_id')

    // get the restaurant with that id
    .get(function(req, res) {
      Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {          
        if (err) res.send(err);

        //return that restaurant
        res.json(restaurant);
      });
    })

    // update the restaurant with this id
    .put(function(req, res) {
      // use our restaurant model to find the restaurant we want
      Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) res.send(err);

        // update the restaurant's info only if it's new
        if (req.body.name) restaurant.name = req.body.name;
        if (req.body.description) restaurant.description = req.body.description;
        if (req.body.address) restaurant.address = req.body.address;
        if (req.body.website) restaurant.website = req.body.website;
        if (req.body.phone) restaurant.phone = req.body.phone;

        // save the restaurant
        restaurant.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'Restaurant updated!' });
        });
      });
    })

    .delete(function(req, res) {
      Restaurant.remove({
        _id: req.params.restaurant_id
      }, function(err, user) {
        if (err) return res.send(err);

        res.json({ message: 'Successfully deleted restaurant' });
      });
    });

    

  app.use('/api', apiRouter);

  app.get('*', function(req, res) {
    res.sendFile('index');
  });

}
