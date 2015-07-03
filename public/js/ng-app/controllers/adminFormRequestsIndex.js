angular
  .module('Juno')
  .controller('adminFormRequestsIndex', adminFormRequestsIndex);

adminFormRequestsIndex.$inject =  ['$scope', 'FormRequest', '$location', 'flash', '$state'];

function adminFormRequestsIndex ($scope, FormRequest, $location, flash, $state) {

  $scope.type = 'list';

  $scope.flash = flash;

  // get all form requests
  var getFormRequests = function() {
    FormRequest.all()
    .success(function(data) {
      $scope.formRequests = data;
      console.log(data[1]);
    });
  };

  getFormRequests();
}
