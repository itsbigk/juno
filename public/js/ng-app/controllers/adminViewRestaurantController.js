angular.module('Juno')

.controller('viewRestaurantController', ['$scope', 'Restaurant', '$stateParams', '$location', function($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'view';

  Restaurant.get($stateParams.restaurant_id)
  .success(function(data) {
    $scope.restaurant = data;
  });

}]);
