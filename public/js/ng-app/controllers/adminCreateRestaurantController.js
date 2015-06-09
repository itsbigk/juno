angular.module('createRestaurantController', [])

.controller('createRestaurantController', ['$scope', 'Restaurant', function($scope, Restaurant) {

  $scope.type = 'create';

  // empty object for form data to create new restaurants
  $scope.formData = {};

  // function for creating new restaurants
  // this will run when the ng-click function on the view happens
  $scope.saveRestaurant = function(formData) {

    console.log($scope.formData);

    $scope.processing = true;

    $scope.message = '';

    Restaurant.create($scope.formData)
      .success(function(data) {

        $scope.processing = false;

        // display the message given by the server saying the creation is successful
        $scope.message = data.message;
      });
      // .error(function(err) {
      //
      //   // display the error that the server gives back
      //   $scope.message = err.message;
      // });
  };

}]);
