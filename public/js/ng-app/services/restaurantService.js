angular.module('restaurantService', [])

.factory('Restaurants', function($http) {
  return {
    get : function() {
      return $http.get('/api/restaurants');
    },
    create : function(restaurantForm) {
      return $http.post('/api/restaurants/', restaurantForm);
    },
    update : function(id, restaurantForm) {
      return $http.put('/api/restaurants/' + id, restaurantForm);
    },
    delete : function(id) {
      return $http.delete('/api/restaurants' + id);
    }
  };
});
