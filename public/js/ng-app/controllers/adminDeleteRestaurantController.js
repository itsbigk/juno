angular
  .module('Juno')
  .controller('deleteRestaurantController', deleteRestaurantController);

deleteRestaurantController.$inject = ['$scope', 'Restaurant', '$stateParams', '$location'];

function deleteRestaurantController($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'delete';

  var getRestaurants = function() {
    Restaurant.all()
    .success(function(data) {
      $scope.restaurants = data;
    });
  };

  $scope.go = function(restaurant) {
    var hash = '/admin/restaurants/' + restaurant._id;
    $location.path(hash);
  };

  $scope.deleteRestaurant = function(restaurant) {

    Restaurant.delete(restaurant)
      .success(function(data) {
        $scope.message = data.message;
        getRestaurants();
      })
      .error(function(data) {
        $scope.message = data.message;
      });
  };

  getRestaurants();

}
