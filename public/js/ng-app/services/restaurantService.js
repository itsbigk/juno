angular
  .module('Juno')
  .factory('Restaurant', Restaurant);

Restaurant.$inject = ['$http'];

function Restaurant($http) {
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
    archive : function(id, restaurantForm) {
      return $http.patch('/api/restaurants/' + id, restaurantForm);
    },
    delete : function(id) {
      return $http.delete('/api/restaurants/' + id);
    }
  }
}
