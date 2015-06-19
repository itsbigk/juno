angular
  .module('Juno')
  .controller('homeController', homeController);

homeController.$inject = ['$scope', 'flash'];

function homeController($scope, flash) {
  $scope.flash = flash;
}
