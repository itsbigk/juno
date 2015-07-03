'use strict';

var path    = require('path'),
aws         = require('aws-sdk'),
AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY,
AWS_SECRET_KEY = process.env.AWS_SECRET_KEY,
S3_BUCKET = process.env.S3_BUCKET,
Restaurant  = require('./db/models/restaurant.js'),
FormRequest = require('./db/models/formRequest.js'),
FoodPreference = require('./db/models/FoodPreference');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  // middleware to use for all requests
  apiRouter.use(function(req, res, next) {
    // this is where we will authenticate users
    next();
  });

  apiRouter.route('/requests/:id')
    .get(function(req, res) {
      FormRequest.findById(req.params.id)
        .populate('foodPreferences')
        .exec()
        .then(function(formRequest) {
          res.json(formRequest);
        });
    });

  apiRouter.route('/requests')

  // get all the form requests
  .get(function(req, res) {
    FormRequest.find()
    .populate('foodPreferences')
    .exec()
    .then(function(formRequest){
      res.json(formRequest);
    })
  })

  // create a request
  .post(function(req, res) {

    // create a new instance of the formRequest model
    var formRequest = new FormRequest();
    formRequest.zipcode = req.body.zipcode;
    formRequest.email = req.body.email;
    formRequest.craving = req.body.craving;
    formRequest.budget = req.body.budget;

    var preferenceNames = [];

    for (var preference in req.body.foodPreferences) {
      if (req.body.foodPreferences.hasOwnProperty(preference)) {
        if (preference !== 'Other') {
          preferenceNames.push(preference);
        } else {
          formRequest.otherPreference = req.body.foodPreferences.Other;
        }
      }
    }

    FoodPreference
      .where('name').in(preferenceNames)
      .exec()
      .then(function(foodPreferences) {
        formRequest.foodPreferences = foodPreferences;
        return Promise.resolve();
      })
      .then(formRequest.save)
      .then(function(formRequest) {
        res.json();
        Promise.resolve();
      })
      .onReject(function(err) {
        console.log('error: ', err);
        res.status(409).json(err);
      });
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
      // making all of the address and cuisine fields lowercase for more consistent data
      if (req.body.name != undefined) restaurant.name = req.body.name.toLowerCase();
      if (req.body.cuisine != undefined) restaurant.cuisine = req.body.cuisine.toLowerCase();
      if (req.body.street != undefined && req.body.city != undefined) restaurant.address = req.body.street.toLowerCase() + ' ' + req.body.city.toLowerCase() + ', ' + req.body.state.toLowerCase() + ' ' + req.body.zip
      if (req.body.street != undefined) restaurant.street = req.body.street.toLowerCase();
      if (req.body.city != undefined) restaurant.city = req.body.city.toLowerCase();
      if (req.body.state != undefined) restaurant.state = req.body.state.toLowerCase();
      restaurant.zip = req.body.zip;
      restaurant.website = req.body.website;
      restaurant.phone = req.body.phone;
      restaurant.email = req.body.email;
      restaurant.archived = false;
      restaurant.imageUrl = req.body.imageUrl;
      restaurant.menuItems = req.body.menuItems;


      // save the restaurant and check for errors
      restaurant.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.status(400).send({ success: false, message: 'Restaurant already exists.', restaurant_id: restaurant._id});
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
        // changing all of the address and cuising fields to be all lowercase to have more consistent data
        if (req.body.name != restaurant.name) restaurant.name = req.body.name;
        if (req.body.street != restaurant.street || req.body.city != restaurant.city || req.body.state != restaurant.state || req.body.zip != restaurant.zip) restaurant.address = req.body.street.toLowerCase() + ' ' + req.body.city.toLowerCase() + ', ' + req.body.state.toLowerCase() + ' ' + req.body.zip
        if (req.body.street != restaurant.street) restaurant.street = req.body.street.toLowerCase();
        if (req.body.city != restaurant.city) restaurant.city = req.body.city.toLowerCase();
        if (req.body.state != restaurant.state) restaurant.state = req.body.state.toLowerCase();
        if (req.body.zip != restaurant.zip) restaurant.zip = req.body.zip;
        if (req.body.cuisine != restaurant.cuisine) restaurant.cuisine = req.body.cuisine.toLowerCase();
        if (req.body.website != restaurant.website) restaurant.website = req.body.website;
        if (req.body.phone != restaurant.phone) restaurant.phone = req.body.phone;
        if (req.body.email != restaurant.email) restaurant.email = req.body.email;
        if (req.body.archived) restaurant.archived = req.body.archived;

        // save the restaurant
        restaurant.save(req.body, function(err) {
          if (err) {
            // duplicate entry
            if (err.code == 11000)
              return res.status(400).send({ success: false, message: 'Restaurant already exists.'});
            else
              return res.send(err);
          }
          // return a message
          res.json({ message: 'Restaurant updated!' });
        });
      });
    })

    .patch(function(req, res) {
      Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) res.status(404).send(err);
        if (restaurant === null) return res.status(404).send(err);

        restaurant.update(req.body, function(err) {
          if (req.body.archived === true) {
            if (err) return res.status(400).send({ success: false, message: 'Restaurant was not archived.'});

            res.json({ message: 'Restaurant archived!' });
          } else {
              if (err) return res.status(400).send({ success: false, message: 'Restaurant was not restored.'});

              res.json({ message: 'Restaurant restored!' });
          }
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

  // getting the s3 url to save to the database

  app.get('/sign_s3', function(req, res){
    console.log('made it to s3 upload');
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({region: 'us-east-1' , signatureVersion: 'v4' });
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log('uploaded!');
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
  });

  app.get('/', function(req, res) {
    res.sendFile('index');
  });

  app.get('*', function(req, res) {
    res.redirect('/');
  });

}
