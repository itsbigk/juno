angular
  .module('Juno')
  .controller('adminArchiveList', adminArchiveList);

adminArchiveList.$inject = ['$scope', 'Restaurant', '$location', 'flash', '$state'];

function adminArchiveList($scope, Restaurant, $location, flash, $state) {

  $scope.type = 'archived';

  $scope.flash = flash;

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

  $scope.restoreListing = function(restaurant) {
    Restaurant.archive(restaurant, {archived: false, archiveDate: ''})
      .success(function(data) {
        flash.setMessage(data.message);
        $state.go('admin-archive-list', {}, {reload: true});
        getRestaurants();
      })
      .error(function(err) {
        flash.setMessage(err.message);
        $state.go('admin-archive-list', {}, {reload: true});
      });
  };
  getRestaurants();
}
