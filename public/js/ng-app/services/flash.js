angular.module('Juno')

.factory("flash", function($rootScope) {
  var queue = [];
  var currentMessage = "";

  $rootScope.$on("$stateChangeSuccess", function() {
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function(message) {
      queue.push(message);
      console.log(message);
    },
    getMessage: function() {
      return currentMessage;
      console.log(message);
    }
  };
});