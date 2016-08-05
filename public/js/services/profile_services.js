angular.module('ProfileService', [])
  .factory('profileService', ['$http', function($http) {
    return {
      getProfile: function(data) {
        return $http.post('/get_profile', data);
      },
      editProfile: function(data) {
        return $http.put('/update_profile_details', data);
      },
      editFitnessLevel: function(data) {
        return $http.put('/update_fitness_profile', data);
      },
      updateProfilePicture: function(data) {
        return $http.put('/update_profile_picture', data);
      },
      addBike: function(data) {
        return $http.put('/add_bike', data);
      },
      updateBike: function(data) {
        return $http.put('/update_bike', data);
      },
      deleteBike: function(data) {
        return $http.put('/delete_bike', data);
      },
      getUser: function(data) {
        return $http.post('/get_user', data);
      },
      getAllUsers: function() {
        return $http.get('/get_all_users');
      }
    };
  }]);
