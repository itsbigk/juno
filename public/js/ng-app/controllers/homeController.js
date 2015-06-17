angular.module('Juno')

.controller('homeController', ['$scope', 'flash', function($scope, flash) {
  $scope.flash = flash;
}]);
