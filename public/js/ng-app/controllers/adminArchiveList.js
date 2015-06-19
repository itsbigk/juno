angular.module('Juno')

  .controller('adminArchiveList', adminArchiveList);

  adminArchiveList.$inject = ['$scope', 'Restaurant', '$location'];

  function adminArchiveList($scope, Restaurant, $location) {

    $scope.type = 'archived';

    $scope.message = '';

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
      Restaurant.archive(restaurant)
        .success(function(data) {
          $scope.message = data.message;
          getRestaurants();
        })
        .error(function(err) {
          $scope.message = err.message;
        });
    };
    getRestaurants();
  }
