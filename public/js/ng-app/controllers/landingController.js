angular
  .module("Juno")
  .controller("landingController", landingController);

  landingController.$inject = ['$scope'];

  function landingController($scope) {

    var testUrl = 'https://d4z6dx8qrln4r.cloudfront.net/choice-5582027a2f289-supersize.jpeg'
    var formData = {};
    var formData.foodPreferences = [];


    $scope.images = [
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      },
      {
        url: testUrl
      }
    ];

    $scope.foodPreferences = ['Gluten Free', 'Peanut Allergy', 'Vegan', 'Vegetarian', 'Pescatarian', 'None'];


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

    // $(document).on('click', '#hero-button', function(e){
    //   ('#food-choices').smoothScroll();
    // });

  }