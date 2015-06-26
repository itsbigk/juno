angular
  .module("Juno")
  .controller("landingController", landingController);

  landingController.$inject = ['$scope', 'FormRequest', 'smoothScroll'];

  function landingController($scope, FormRequest, smoothScroll) {

    var testUrl = 'https://d4z6dx8qrln4r.cloudfront.net/choice-5582027a2f289-supersize.jpeg';
    $scope.formData = {};

    $scope.formData.foodPreferences = [
      {name:'Gluten Free', selected: false},
      {name:'Peanut Allergy', selected: false},
      {name:'Vegan', selected: true},
      {name:'Vegetarian', selected: false},
      {name:'Pescatarian', selected: false},
      {name: 'Other', selected: false, value: ""}
    ];


    $scope.stateChanged = function (qId) {
        console.log("calls state Change");
       if($scope.formData.foodPreferences[qId]){ //If it is checked
           console.log('changed checkbon: ', $scope.formData.foodPreferences[qId]);
       }
    }

    $scope.images = [
      {url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}, {name: 'mac and cheese', url: testUrl}
    ];

    $scope.saveRequestForm = function() {

      $scope.processing = true;

      FormRequest.create($scope.formData)
        .success(function(data) {

          $scope.processing = false;

          if (data.errors === undefined) {
            flash.setMessage(data.message);
            $scope.formData = {};
            clearErrorStyling();
            $state.go('thank-you');
          }
          else {
            // clearErrorStyling();
            // addErrorStyling(data);
            console.log(data)
          }
        })
        .error(function(err){
          if (err.errors) {
            // addErrorStyling(err);
          } else {
            flash.setMessage(err.message);
            $state.go('/');
          }
        });
    };

    $scope.selectCraving = function(item) {
      $scope.formData.craving = item;
      var element = document.getElementById('food-preferences');
      smoothScroll(element);
    }


    // Logic for price hover over
    $scope.rate = 1;
    $scope.max = 3;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      if ($scope.overStar == 1){
        $scope.averageCost = "$5 - $10";  
      } else if ($scope.overStar == 2){
        $scope.averageCost = "$10 - $18";  
      } else if ($scope.overStar ==3){
        $scope.averageCost = "$18 - $25";  
      }
      
    };

  }