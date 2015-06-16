angular.module('Juno')

.controller('editRestaurantController', ['$scope', 'Restaurant', '$stateParams', '$location', function($scope, Restaurant, $stateParams, $location) {

  $scope.type = 'edit';

  Restaurant.get($stateParams.restaurant_id)
    .success(function(data) {
      $scope.formData = data;
    });

  // Clears error elements and error styling
  function clearErrorStyling() {
    $(".form-control").removeClass("error");
    $(".error-message").remove();
  }

    // function for editing restaurants
    // this will run when the ng-click function on the view happens
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
        })
        .error(function(err){
          // Clear previous errors in case user has fixed some fields
          clearErrorStyling();
          // Each key in errors is the name associated with an input ID. Loops through all keys to get all the error fields
          for (var key in err.errors) {
            $scope.message = err.message;
            // Removes unwanted characters from error messages for more user-friendly messages
            var errorMessage = err.errors[key].message.replace(/Path|`/g, '').trim(),
                errorElementId = "#" + key;
            // Checks to make sure that an error message is not applied more than once
            if ( !$(errorElementId).hasClass("error") ){
              console.log("has error: " + errorElementId);
              $(errorElementId + "-container").append("<div class='error-message'>" + errorMessage  + "</div>");
            }
            $(errorElementId).addClass("error");
          }
        });
    };
}]);
