angular.module('Juno')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url         : '/',
      controller  : 'homeController',
      templateUrl : 'partials/home.html'
    })
    .state('admin', {
      url         : '/admin',
      controller  : 'adminRestaurantIndex',
      templateUrl : 'partials/admin/admin.html'
    })
    .state('admin-restaurant-index', {
      url         : '/admin/restaurants',
      controller  : 'adminRestaurantIndex',
      templateUrl : 'partials/admin/restaurants/index.html'
    })
    .state('admin-archive-list', {
      url         : '/admin/restaurants/archive',
      controller  : 'adminArchiveList',
      templateUrl : 'partials/admin/restaurants/archives.html'
    })
    .state('admin-delete-restaurants', {
      url         : '/admin/restaurants/delete',
      controller  : 'deleteRestaurantController',
      templateUrl : 'partials/admin/restaurants/index.html'
    })
    .state('admin-restaurant-new', {
      url         : '/admin/restaurants/new',
      controller  : 'createRestaurantController',
      templateUrl : 'partials/admin/restaurants/restaurant.html'
    })
    .state('admin-edit-menu', {
      url         : '/admin/restaurants/edit/menu/:restaurant_id',
      controller  : 'editRestaurantController',
      templateUrl : 'partials/admin/restaurants/menu.html'
    })
    .state('admin-view-restaurant', {
      url         : '/admin/restaurants/:restaurant_id',
      controller  : 'viewRestaurantController',
      templateUrl : 'partials/admin/restaurants/viewRestaurant.html'
    })
    .state('admin-edit-restaurant', {
      url         : '/admin/restaurants/edit/:restaurant_id',
      controller  : 'editRestaurantController',
      templateUrl : 'partials/admin/restaurants/restaurant.html'
    });
}]);
