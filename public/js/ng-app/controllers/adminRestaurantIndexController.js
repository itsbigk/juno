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
    Restaurant.update(restaurant, {archived: true})
      .success(function(data) {
        $scope.message = 'Restaurant archived successfully!';
        getRestaurants();
      })
      .error(function(err) {
        $scope.message = 'Restaurant was not archived';
      });
  };

  getRestaurants();
}]);
