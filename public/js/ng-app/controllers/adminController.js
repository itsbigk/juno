angular.module('adminController', [])

.controller('adminController', ['$scope', 'Restaurants', function($scope, Restaurants) {

  // get all restaurants
  Restaurants.get()
    .success(function(data) {
      $scope.restaurants = data;
    });

  // empty object for form data to create new restaurants
  $scope.formData = {};

  // function for creating new restaurants
  // this will run when the ng-click function on the view happens
  $scope.createRestaurant = function(formData) {
    Restaurants.create(formData);
  };
}]);
