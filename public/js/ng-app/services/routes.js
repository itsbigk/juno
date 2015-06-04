angular.module('ngRoutes', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller  : 'homeController',
      templateUrl : 'views/home.html'
    })
    .when('/admin', {
      controller  : 'adminController',
      templateUrl : 'views/admin/admin.html'
    })
    .otherwise({
      redirectTo : '/'
    });
});
