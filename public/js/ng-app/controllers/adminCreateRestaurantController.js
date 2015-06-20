angular
  .module('Juno')
  .controller('createRestaurantController', createRestaurantController);

createRestaurantController.$inject = ['$scope', '$state', 'Restaurant', 'flash'];

function createRestaurantController($scope, $state, Restaurant, flash, Upload) {
  $scope.flash = flash;
  $scope.type = 'create';
  // empty object for form data to create new restaurants
  $scope.formData = {};

  // Clears error elements and error styling
  function clearErrorStyling() {
    $(".form-control").removeClass("error");
    $(".error-message").remove();
  }

  function addErrorStyling(data) {
    // Each key in errors is the name associated with an input ID. Loops through all keys to get all the error fields
    for (var key in data.errors) {
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

  // Creates new restaurant. Runs when the ng-click function on the view happens
  $scope.saveRestaurant = function() {

    $scope.processing = true;

    Restaurant.create($scope.formData)
      .success(function(data) {

        $scope.processing = false;

        if (data.errors === undefined) {
          flash.setMessage(data.message);
          $scope.formData = {};
          clearErrorStyling();
          // Reload the template after any result to show flash confirmation message
          $state.go('admin-restaurant-new', {}, {reload: true});
        }
        else {
          clearErrorStyling();
          addErrorStyling(data);
        }
      })
      .error(function(err){
        if (err.errors) {
          addErrorStyling(err);
        } else {
          flash.setMessage(err.message);
          // Reload the template after any result to show flash duplicate record error message
          $state.go('admin-restaurant-new', {}, {reload: true});
        }
      });
  };
}
