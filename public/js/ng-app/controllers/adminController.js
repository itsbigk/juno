angular.module('adminController', [])

.controller('adminController', ['$scope', 'Restaurant', function($scope, Restaurant) {

  // get all restaurants
  Restaurant.all()
    .success(function(data) {
      $scope.restaurants = data;
    });

  $scope.message = '';
  
}]);
