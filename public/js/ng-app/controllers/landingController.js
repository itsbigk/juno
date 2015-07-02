'use strict';

angular
  .module('Juno')
  .controller('landingController', landingController);

  landingController.$inject = ['$scope', 'FormRequest', 'smoothScroll', '$state'];

  function landingController($scope, FormRequest, smoothScroll, $state) {

    angular.extend($scope, {
      formData: {
        foodPreferences: {},
        craving: undefined,
        budget: undefined
      },
      formOptions: getFormOptions(),
      saveRequestForm: saveRequestForm,
      errors: {},
      zipRegex: /^\d{5}(-\d{4})?$/,
      emailRegex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    });

    $scope.$watch('foodPreferenceOtherToggle', function(value) {
      if (!value) {
        delete $scope.formData.foodPreferences.Other;
      }
    });

    $scope.$watch('formData.foodPreferences', function(foodPreferences) {
      for (var preference in foodPreferences) {
        if (foodPreferences.hasOwnProperty(preference)) {
          if (foodPreferences[preference] === false) {
            delete foodPreferences[preference];
          } else {
            delete $scope.errors['food-preferences'];
          }
        }
      }
    }, true);

    function getFormOptions() {
      // TODO this should hit the server

      var cravings = [
        {
          name: 'Carbs',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/carbs.jpg'
        },
        {
          name: 'Light & Healthy',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/light-healthy.jpg'
        },
        {
          name: 'Meats',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/meats.jpg'
        },
        {
          name: 'Seafood',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/seafood.jpg'
        },
        {
          name: 'Greasy',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/greasy.jpg'
        },
        {
          name: 'Raw & Clean',
          url: 'https://s3.amazonaws.com/junopay-development/general-images/raw-clean.jpg'
        }
      ];

      var preferences = [
        'Vegan',
        'Vegetarian',
        'Pescatarian',
        'Gluten Free',
        'Peanut Allergy',
        'Dairy',
        'None'
      ];

      var budgets = [
        '$',
        '$$',
        '$$$'
      ];

      return {
        cravings: cravings,
        preferences: preferences,
        budgets: budgets
      };
    }

    function saveRequestForm() {
      var data = angular.copy($scope.formData);

      $scope.errors = {};

      // Validate Craving
      if (!data.craving) {
        $scope.errors['food-choices'] = 'Please select a craving';
      }

      // Validate Preferences
      var hasPreference = false;
      for (var preference in data.foodPreferences) {
        if (data.foodPreferences.hasOwnProperty(preference)) {
          hasPreference = true;
          break;
        }
      }
      if (!hasPreference) {
        $scope.errors['food-preferences'] = 'Please select preferences';
      }

      // Validate Budget
      if (!data.budget) {
        $scope.errors.budget = 'Please select your budget';
      }

      // Validate Email
      if (!data.email || !$scope.emailRegex.test(data.email)) {
        $scope.errors.email = 'Please enter a valid email';
      }

      // Validate Zip

      if (!data.zipcode || !$scope.zipRegex.test(data.zipcode)) {
        $scope.errors.zipcode = 'Please enter a valid zip code.';
      }

      if (!_.isEmpty($scope.errors)) {
        var element;
        for (var first in $scope.errors) {
          if ($scope.errors.hasOwnProperty(first)) {
            element = document.getElementById(first);
            break;
          }
        }

        if (element) {

          smoothScroll(element);
        }
      } else {
        FormRequest.create(data)
          .success(function() {
            $state.go('thank-you');
          })
          .error(function(err) {
            console.log('error: ', err);
          });
      }
    }
  }
