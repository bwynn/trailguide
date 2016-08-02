angular.module('TrailService', [])
  .factory('trailService', ['$http', function($http) {
    return {
      getAllTrails: function() {
        return $http.get('/get_all_trails');
      },
      getTrail: function(data) {
        return $http.post('/get_trail', data);
      },
      addTrail: function(data) {
        return $http.post('/add_trail', data);
      },
      updateTrail: function(data) {
        return $http.put('/update_trail', data);
      },
      addFeaturedImage: function(data) {
        return $http.put('/add_featured_image', data);
      },
      removeTrail: function(data) {
        return $http.put('/remove_trail', data);
      },
      addKeywords: function(data) {
        return $http.put('/add_kewords', data);
      },
      addTrailRating: function(data) {
        return $http.put('/add_trail_rating', data);
      }
    }
  }]);
