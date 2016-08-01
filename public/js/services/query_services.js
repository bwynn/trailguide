angular.module('QueryService', [])
  .factory('queryService', ['$http', function($http) {
    return {
      findByKeyword: function(data) {
        return $http.post('/find_by_keyword', data);
      },
      findByFitness: function(data) {
        return $http.post('/find_by_fitness', data);
      },
      findByDistance: function(data) {
        return $http.post('/find_by_distance', data);
      },
      findBySkill: function(data) {
        return $http.post('/find_by_title', data);
      }
    };
  }]);
