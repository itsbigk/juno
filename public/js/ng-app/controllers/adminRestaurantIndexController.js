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
