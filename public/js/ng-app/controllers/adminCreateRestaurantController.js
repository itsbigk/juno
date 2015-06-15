angular
  .module('Juno')
  .controller('createRestaurantController', ['$scope', '$state', 'Restaurant', function($scope, $state, Restaurant) {

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
        console.log("success!");
        console.log("data: ", data);

        $scope.processing = false;

        if (data.errors === null) {
          $scope.message = data.message;
          $scope.formData = {};
        }
        else {
          for (var key in data.errors) {
            $scope.message = data.message;
            var errorMessage = data.errors[key].message.substring(5).replace(/`/g, ''),
                errorElementId = "#" + key;
            if ( !$(errorElementId).hasClass("error") ){
              $(errorElementId + "-container").append("<div class='error-message'>" + errorMessage  + "</div>");
            }
            $(errorElementId).addClass("error");
          }
        }
      })
      .error(function(err){
        $scope.message = err.message;
      });
  };
}]);
