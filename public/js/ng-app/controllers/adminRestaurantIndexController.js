angular
  .module('Juno')
  .controller('adminRestaurantIndex', adminRestaurantIndex);

adminRestaurantIndex.$inject =  ['$scope', 'Restaurant', '$location', 'flash', '$state'];

function adminRestaurantIndex ($scope, Restaurant, $location, flash, $state) {

  $scope.type = 'list';

  $scope.flash = flash;

  // get all restaurants
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

  $scope.archiveListing = function(restaurant) {
    Restaurant.archive(restaurant, {archived: true, archiveDate: Date.now()})
      .success(function(data) {
        flash.setMessage(data.message);
        $state.go('admin-restaurant-index', {}, {reload: true});
        getRestaurants();
      })
      .error(function(err) {
        flash.setMessage(err.message);
        $state.go('admin-restaurant-index', {}, {reload: true});
      });
  };

  getRestaurants();
}
