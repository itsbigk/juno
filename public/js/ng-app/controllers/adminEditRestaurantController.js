angular.module('Juno')

.controller('editRestaurantController', ['$scope', 'Restaurant', '$stateParams', '$location', function($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'edit';

  Restaurant.get($stateParams.restaurant_id)
    .success(function(data) {
      $scope.formData = data;
      $scope.restaurantState = data.state;
    });

    // Clears error elements and error styling
  function clearErrorStyling() {
    $(".form-control").removeClass("error");
    $(".error-message").remove();
  }

  $scope.saveRestaurant = function() {

    console.log($scope.formData);

    $scope.processing = true;

    $scope.message = '';

    Restaurant.update($stateParams.restaurant_id, $scope.formData)
      .success(function(data) {
        console.log("success!");
        console.log("data: ", data);

        $scope.processing = false;

        if (data.errors === undefined) {
          $scope.message = data.message;
          // Clears all error styling for new form load
          clearErrorStyling();
        }
        else {
          // Clear previous errors in case user has fixed some fields
          clearErrorStyling();
          // Each key in errors is the name associated with an input ID. Loops through all keys to get all the error fields
          for (var key in data.errors) {
            $scope.message = data.message;
            // Removes unwanted characters from error messages for more user-friendly messages
            var errorMessage = data.errors[key].message.replace(/Path|`/g, '').trim(),
                errorElementId = "#" + key;
            // Checks to make sure that an error message is not applied more than once
            if ( !$(errorElementId).hasClass("error") ){
              console.log("has error: " + errorElementId);
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
