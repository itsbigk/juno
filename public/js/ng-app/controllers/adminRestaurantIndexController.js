angular.module('Juno')

.controller('adminRestaurantIndex', ['$scope', 'Restaurant', function($scope, Restaurant) {

  $scope.type = 'list';

  $scope.message = '';

  // get all restaurants
  var getRestaurants = function() {
    Restaurant.all()
    .success(function(data) {
      $scope.restaurants = data;
    });
  };

  $scope.archiveListing = function(restaurant) {
    Restaurant.archive(restaurant)
      .success(function(data) {
        $scope.message = data.message;
        getRestaurants();
      })
      .error(function(err) {
        $scope.message = err.message;
      });
  };

  getRestaurants();
}]);
