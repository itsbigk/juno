angular.module('editRestaurantController', [])

.controller('editRestaurantController', ['$scope', 'Restaurant', '$routeParams', '$location', function($scope, Restaurant, $routeParams, $location) {

  $scope.type = 'edit';

  Restaurant.get($routeParams.restaurant_id)
    .success(function(data) {
      $scope.formData = data;
    });

  $scope.saveRestaurant = function() {

    $scope.processing = true;
    $scope.message = '';

    // calling restaurant service to perform an update
    Restaurant.update($routeParams.restaurant_id, $scope.formData)
      .success(function(data) {

        $scope.processing = false;

        $scope.message = data.message;
      })

      .error(function(err) {

        $scope.processing = false;

        $scope.message = err.message;
      });
  };

  $scope.deleteRestaurant = function() {

    Restaurant.delete($routeParams.restaurant_id)
      .success(function(data) {
        $scope.message = data.message;
      });
  };
}]);
