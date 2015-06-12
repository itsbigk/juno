angular.module('Juno')

  .controller('deleteRestaurantController', ['$scope', 'Restaurant', '$stateParams', function($scope, Restaurant, $stateParams) {

    $scope.type = 'delete';

    Restaurant.all()
      .success(function(data) {
        $scope.restaurants = data;
      });

    $scope.deleteRestaurant = function(restaurant) {

    Restaurant.delete(restaurant)
      .success(function(data) {
        $scope.message = data.message;
        $scope.restaurants = data.restaurants;
      });
    };
  }]);
