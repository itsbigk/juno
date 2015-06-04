angular.module('ngRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);


  $routeProvider
    .when('/', {
      controller  : 'homeController',
      templateUrl : 'partials/home.html'
    })
    .when('/admin', {
      controller  : 'adminController',
      templateUrl : 'partials/admin/admin.html'
    })
    .otherwise({
      redirectTo : '/'
    });

});
