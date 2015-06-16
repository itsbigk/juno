var app = angular.module('Juno');

app.directive('confirmClick', function() {
  return {
    priority: -1,
    restrict: 'A',
    link: function (scope, element, attr) {
      var msg = attr.confirmation || "Are you sure?";
      element.bind('click', function (e) {
        if (window.confirm(msg)) {
          var action = attr.confirmClick;
          if (action)
            scope.$apply(scope.$eval(action));
        }
      });
    }
  };
});