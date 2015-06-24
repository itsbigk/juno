angular
  .module("Juno")
  .controller("landingController", landingController);

  landingController.$inject = ['$scope'];

  function landingController($scope) {
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