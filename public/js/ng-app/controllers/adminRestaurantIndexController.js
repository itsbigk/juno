angular.module('Juno')

.controller('adminRestaurantIndex', ['$scope', 'Restaurant', '$location', function($scope, Restaurant, $location) {

  $scope.type = 'list';

  $scope.message = '';

  // get all restaurants
  var getRestaurants = function() {
    Restaurant.all()
    .success(function(data) {
      $scope.restaurants = data;
    });
  };

  $scope.go = function(restaurant) {
    console.log(restaurant);
    var hash = '/admin/restaurants/' + restaurant._id;
    $location.path(hash);
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
