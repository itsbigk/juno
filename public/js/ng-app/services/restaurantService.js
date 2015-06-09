angular.module('restaurantService', [])

.factory('Restaurant', function($http) {
  return {
    all : function() {
      return $http.get('/api/restaurants');
    },
    get : function(id) {
      return $http.get('/api/restaurants/' + id);
    },
    create : function(restaurantForm) {
      return $http.post('/api/restaurants', restaurantForm);
    },
    update : function(id, restaurantForm) {
      return $http.put('/api/restaurants/' + id, restaurantForm);
    },
    delete : function(id) {
      return $http.delete('/api/restaurants/' + id);
    }
  };
});
