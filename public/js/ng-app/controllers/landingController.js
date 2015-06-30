'use strict';

angular
  .module('Juno')
  .controller('landingController', landingController);

  landingController.$inject = ['$scope', 'FormRequest', 'smoothScroll'];

  function landingController($scope, FormRequest, smoothScroll, flash, $state) {

    $scope.formData = {};

    // $scope.formData.foodPreferences = [
    //   {name:'Gluten Free', selected: false},
    //   {name:'Peanut Allergy', selected: false},
    //   {name:'Vegan', selected: false},
    //   {name:'Vegetarian', selected: false},
    //   {name:'Pescatarian', selected: false},
    //   {name: 'Other', selected: false, value: ''}
    // ];

    $scope.$watch('formData.craving', function(value) {
      if (value) {
        smoothScroll(document.getElementById('food-preferences'));
      }
    });

    function getCravingsAndPreferences() {
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
        'Gluten Free',
        'Peanut Allergy',
        'Vegan',
        'Vegetarian',
        'Pescatarian'
      ];

      return {
        cravings: cravings,
        preferences: preferences
      };
    }

    $scope.cravings = getCravingsAndPreferences().cravings;
    $scope.preferences = getCravingsAndPreferences().preferences;

    $scope.saveRequestForm = function() {

      $scope.processing = true;

      FormRequest.create($scope.formData)
        .success(function(data) {

          $scope.processing = false;

          if (data.errors === undefined) {
            flash.setMessage(data.message);
            $scope.formData = {};
            clearErrorStyling();
            $state.go('thank-you');
          }
          else {
            // clearErrorStyling();
            // addErrorStyling(data);
            console.log(data);
          }
        })
        .error(function(err){
          if (err.errors) {
            // addErrorStyling(err);
          } else {
            flash.setMessage(err.message);
            $state.go('/');
          }
        });
    };



    // Logic for price hover over
    $scope.rate = 1;
    $scope.max = 3;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      if ($scope.overStar === 1) {
        $scope.averageCost = '$5 - $10';
      } else if ($scope.overStar === 2) {
        $scope.averageCost = '$10 - $18';
      } else if ($scope.overStar === 3) {
        $scope.averageCost = '$18 - $25';
      }

    };

  }
