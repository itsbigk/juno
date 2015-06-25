angular
  .module('Juno')
  .controller('editRestaurantController', editRestaurantController);

editRestaurantController.$inject = ['$scope', 'Restaurant', '$stateParams', '$location', 'flash', '$state'];

function editRestaurantController($scope, Restaurant, $stateParams, $location, flash, $state) {
  $scope.$on('$viewContentLoaded', formImageInput);
  $scope.flash = flash;
  if($state.current.url === '/admin/restaurants/edit/:restaurant_id') {
    $scope.type = 'edit';
  } else {
    $scope.type = 'menuEdit';
  }

  Restaurant.get($stateParams.restaurant_id)
    .success(function(data) {
      $scope.formData = data;
    });

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

  $scope.addMenuItem = function() {
    var itemToAdd = { "name": "", "price": "", "description": "", "imageUrl": "" };
    $scope.formData.menuItems.push(itemToAdd);
  };

  $scope.removeItem = function(itemIndex) {
    $scope.formData.menuItems.splice(itemIndex, 1);
  };

  function getMenuIndex(item) {
    $scope.menuIndex = angular.element(item).scope().$index;
  }

  $scope.s3Upload = function(image){
    getMenuIndex(image);
    console.log(image);
    console.log($scope.menuIndex);
    // var status_elem = document.getElementById("status");
    // var url_elem = document.getElementById("image_url");
    // var preview_elem = document.getElementById("preview");
    var s3upload = new S3Upload({
      s3_object_name: showImageIdentifier(),  // upload object with a custom name
      file_dom_selector: 'image',
      s3_sign_put_url: '/sign_s3',
      // onProgress: function(percent, message) {
      //     status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
      // },
      onFinishS3Put: function(public_url) {
          // status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
          if($scope.type === 'edit' || $scope.type === 'create') {
            $scope.formData.imageUrl = public_url;
          } else if($scope.type === 'menuEdit') {
            console.log($scope.formData.menuItems[$scope.menuIndex].imageUrl);
            $scope.formData.menuItems[$scope.menuIndex].imageUrl = public_url;
          }
          // console.log($scope.formData.imageUrl);
          // preview_elem.innerHTML = '<img src="'+ public_url +'" style="width:300px;" />';
      },
      onError: function(status) {
        flash.setMessage(status);
      }
    });
  };

  function showImageIdentifier() {
    var restName;
    if($scope.type === 'create' || $scope.type === 'edit') {
      restName = $scope.formData.name;
    } else if($scope.type === 'menuEdit') {
      restName = $scope.formData.menuItems[$scope.menuIndex].name;
    }
    if(restName) {
      restName = restName.replace(/[^\w\s]|_/g, " ") .replace(/\s+/g, "_");
    }
    var dateId = Date.now().toString();
    return [dateId, restName].join('_');
  }

  // Edits restaurant. Runs when the ng-click function on the view happens
  $scope.saveRestaurant = function() {

    $scope.processing = true;

    console.log($scope.formData);

    Restaurant.update($stateParams.restaurant_id, $scope.formData)
      .success(function(data) {

        $scope.processing = false;

        if (data.errors === undefined) {
          flash.setMessage(data.message);
          // Clears all error styling for new form load
          clearErrorStyling();
          // Returns user to index page and displays flash confirmation
          $state.go("admin-restaurant-index");
        } else {
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
          $state.go('admin-edit-restaurant', {}, {reload: true});
        }
      });
  };
}
