'use strict';

var FoodPreference = require('../models/FoodPreference');

function seed() {

  var preferences = [
    {
      name: 'Vegan'
    },
    {
      name: 'Vegetarian'
    },
    {
      name: 'Pescatarian'
    },
    {
      name: 'Gluten Free'
    },
    {
      name: 'Peanut Allergy'
    },
    {
      name: 'Dairy'
    }
  ];

  var promises = preferences.map(function(preference) {
    return new FoodPreference(preference).save();
  });

  return Promise.all(promises);

}

function drop() {
  return FoodPreference.remove();
}

module.exports = {
  seed: seed,
  drop: drop
}
;
