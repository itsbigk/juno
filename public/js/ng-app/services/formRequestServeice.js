angular
  .module('Juno')
  .factory('FormRequest', Restaurant);

  FormRequest.$inject = ['$http'];

  function FormRequest($http) {
    return {
      create : function(requestForm) {
        return $http.post('/api/requests', requestForm);
      },
      update : function(id, requestForm) {
        return $http.put('/api/requests/' + id, requestForm);
      }
    };
  };
