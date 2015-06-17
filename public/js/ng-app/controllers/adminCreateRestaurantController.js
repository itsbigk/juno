angular
  .module('Juno')
  .controller('createRestaurantController', ['$scope', '$state', 'Restaurant', 'flash', function($scope, $state, Restaurant, flash) {

  $scope.flash = flash;
  $scope.type = 'create';
  // empty object for form data to create new restaurants
  $scope.formData = {};

  // Clears error elements and error styling
  function clearErrorStyling() {
    $(".form-control").removeClass("error");
    $(".error-message").remove();
  }

  // function for creating new restaurants
  // this will run when the ng-click function on the view happens
  $scope.saveRestaurant = function() {

    $scope.processing = true;

    Restaurant.create($scope.formData)
      .success(function(data) {
        console.log("success!");
        console.log("data: ", data);

        $scope.processing = false;

        if (data.errors === undefined) {
          console.log("runs if");
          flash.setMessage(data.message);
          $scope.formData = {};
          // Clears all error styling for new form load
          clearErrorStyling();
        }
        else {
          console.log("runs else");          
          console.log(data);
          // Clear previous errors in case user has fixed some fields
          clearErrorStyling();
          // Each key in errors is the name associated with an input ID. Loops through all keys to get all the error fields
          for (var key in data.errors) {
            flash.setMessage(data.message);
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
        flash.setMessage("Temporary Error Message");
      });
      // Reload the template after any result to show flash message
      $state.go('admin-restaurant-new', {}, {reload: true});
  };
}]);
