angular
  .module('Juno')
  .controller('viewRestaurantController', viewRestaurantController);

viewRestaurantController.$inject =  ['$scope', 'Restaurant', '$stateParams', '$location'];

function viewRestaurantController($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'view';

  Restaurant.get($stateParams.restaurant_id)
  .success(function(data) {
    $scope.restaurant = data;
  });

}
