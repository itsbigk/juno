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
    .when('/admin/restaurants', {
      controller  : 'adminController',
      templateUrl : 'partials/admin/restaurants/index.html'
    })
    .when('/admin/restaurants/new', {
      controller  : 'createRestaurantController',
      templateUrl : 'partials/admin/restaurants/restaurant.html'
    })
    .when('/admin/restaurants/:restaurant_id', {
      controller  : 'editRestaurantController',
      templateUrl : 'partials/admin/restaurants/restaurant.html'
    })
    .otherwise({
      redirectTo : '/'
    });

});
