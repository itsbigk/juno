'use strict';

angular
  .module('Juno')
  .factory("flash", flash);

flash.$inject = ['$rootScope'];

function flash($rootScope) {
  var queue = [];
  var currentMessage = "";

  $rootScope.$on("$stateChangeSuccess", function() {
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function(message) {
      queue.push(message);
    },
    getMessage: function() {
      return currentMessage;
    }
  };
}