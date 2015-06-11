angular.module('editRestaurantController', [])

.controller('editRestaurantController', ['$scope', 'Restaurant', '$stateParams', '$location', function($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'edit';

  Restaurant.get($stateParams.restaurant_id)
    .success(function(data) {
      $scope.formData = data;
      $scope.restaurantState = data.state;
    });

  $scope.saveRestaurant = function() {

    $scope.processing = true;
    $scope.message = '';

    // calling restaurant service to perform an update
    Restaurant.update($stateParams.restaurant_id, $scope.formData)
      .success(function(data) {

        $scope.processing = false;

        $scope.message = data.message;
      })

      .error(function(err) {

        $scope.processing = false;

        $scope.message = err.message;
      });
  };
}]);
